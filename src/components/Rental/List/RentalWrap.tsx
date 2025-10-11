import { useEffect, useRef, useState, useCallback } from "react";
import {
  fetchRentals,
  updateRentalById,
} from "services/rentals/rentalServices";
import Modal from "./Modal";
import LoadingBar from "react-top-loading-bar";
import RentalTable from "./RentalTable";
import Pagination from "./Pagination";
import _ from "lodash";
import FilterButtons from "./FilterButtons";
import SearchField from "./SearchField";
export interface Rental {
  id: string;
  costume: string;
  clientName: string;
  contactNumber: string;
  rentalDate: { seconds: number } | Date | null;
  rentalValue: number;
  guarantee: number;
  returnDate: { seconds: number } | Date | null;
  returned: boolean;
}

type LoadingBar = any;

const RentalWrap = () => {
  const [costumesData, setCostumesData] = useState<Rental[]>([]);
  const [selectedCostume, setSelectedCostume] = useState<Rental | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<Rental[]>([]); // State to hold filtered data
  const [filter, setFilter] = useState<"all" | "returned" | "notReturned">(
    "all"
  ); // State to track filter
  const rowsPerPage = 100;

  const loadingBarRef = useRef<LoadingBar>(null);
  const modalRef = useRef<{ openModal: (costume: Rental) => void }>(null);
  const loadRentalsCalledRef = useRef(false);

  const loadRentals = useCallback(async () => {
    if (!loadRentalsCalledRef.current) {
      loadRentalsCalledRef.current = true;
      loadingBarRef.current?.continuousStart();
      const fetchedCostumes = await fetchRentals();
      if (fetchedCostumes) {
        setCostumesData(fetchedCostumes);
        setFilteredData(fetchedCostumes); // Initialize filteredData with all data
      }
      loadingBarRef.current?.complete();
    }
  }, []);

  const updateReturnedState = useCallback((costume: Rental) => {
    setSelectedCostume(costume);
    modalRef.current?.openModal(costume);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (selectedCostume) {
      loadingBarRef.current?.continuousStart();
      const updateSuccess = await updateRentalById(selectedCostume.id, {
        ...selectedCostume,
        returned: !selectedCostume.returned,
        returnDate: selectedCostume.returned ? new Date() : null,
      });
      if (updateSuccess) {
        setCostumesData((prevCostumesData) =>
          prevCostumesData.map((costumeItem) =>
            costumeItem.id === selectedCostume.id
              ? { ...costumeItem, returned: !selectedCostume.returned }
              : costumeItem
          )
        );
        // Update filtered data based on the filter state
        applyFilter(filter);
      } else {
        console.log("Ocurrió un error al actualizar el arriendo.");
      }
      loadingBarRef.current?.complete();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCostume, filter]);

  const applyFilter = (filter: "all" | "returned" | "notReturned") => {
    setFilter(filter);
    switch (filter) {
      case "returned":
        setFilteredData(costumesData.filter((rental) => rental.returned));
        break;
      case "notReturned":
        setFilteredData(costumesData.filter((rental) => !rental.returned));
        break;
      default:
        setFilteredData(costumesData);
    }
  };

  useEffect(() => {
    loadRentals();
  }, [loadRentals]);

  useEffect(() => {
    const newFilteredData = costumesData.filter(
      (rental) =>
        rental.costume.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rental.clientName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(newFilteredData);
  }, [costumesData, searchTerm]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSearch = useCallback(
    _.debounce((term) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const totalCount = filteredData.length;

  return (
    <div className="section">
      <LoadingBar color="#5f22d9" ref={loadingBarRef} />
      <Modal ref={modalRef} onConfirm={handleConfirm} />
      <div className="columns">
        <SearchField handleSearchChange={handleSearchChange} />
        <FilterButtons applyFilter={applyFilter} />
      </div>

      <RentalTable
        rentals={currentRows}
        updateReturnedState={updateReturnedState}
      />
      <Pagination
        totalPages={totalPages}
        totalCount={totalCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default RentalWrap;
