import {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useRef,
} from "react";
import { fetchHelados } from "services/products/productServices";
import { formatCurrency } from "utils/number.utils";
import { IceCream } from "types";

interface POSProductsTableProps {
  sendDataToParent: (data: IceCream[]) => void;
  clearFields: () => void;
  esCompraOsorno: boolean;
}

const POSProductsTable = forwardRef(
  ({ sendDataToParent, esCompraOsorno }: POSProductsTableProps, ref) => {
    const [helados, setHelados] = useState<IceCream[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the input field

    // Create refs to store input elements
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
      const getHelados = async () => {
        const data = await fetchHelados();
        if (data) {
          setHelados(data);
        }
      };

      getHelados();
    }, []);

    const handleCantidadChange = (barcode: string, value: number | string) => {
      setHelados((prevHelados) =>
        prevHelados.map((helado) =>
          helado.barcode === barcode ? { ...helado, cantidad: value } : helado
        )
      );
    };

    const handleKeyRelease = () => {
      sendDataToParent(
        helados.filter((helado) => {
          const cantidad = parseFloat(helado.cantidad as string) || 0;
          return cantidad > 0;
        })
      );
    };

    const handleKeyPress = (
      e: React.KeyboardEvent<HTMLInputElement>,
      barcode: string
    ) => {
      if (e.key === "Enter") {
        e.preventDefault();

        // Find the index of the current helado in the helados array
        const currentIndex = helados.findIndex(
          (helado) => helado.barcode === barcode
        );

        // Focus on the next input element in the refs array
        if (inputRefs.current[currentIndex + 1]) {
          inputRefs.current[currentIndex + 1]?.focus();
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
        handleClearSearch();
        console.log("Clearing fields...");
      }
    };
    const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();

        // Focus on the next input element in the refs array
        if (inputRefs.current[0]) {
          inputRefs.current[0]?.focus();
        }
      }
    };

    useImperativeHandle(ref, () => ({
      clearQuantities() {
        setHelados((prevHelados) =>
          prevHelados.map((helado) => ({ ...helado, cantidad: "" }))
        );
        sendDataToParent([]); // Send an empty array to the parent
        handleClearSearch();
      },
    }));

    const filteredHelados = helados.filter(
      (helado) =>
        helado.helado.toLowerCase().includes(searchTerm.toLowerCase()) ||
        String(helado.barcode || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    );
    const handleClearSearch = () => {
      setSearchTerm(""); // Clear the search term
      if (inputRef.current) {
        inputRef.current.focus(); // Focus the input after clearing the search term
      }
    };

    return (
      <div className="table-container">
        <div className="field is-flex is-align-items-center mt-1">
          <label className="label mr-2">Búsqueda</label>
          <div className="control is-flex-grow-1">
            <input
              ref={inputRef} // Attach the ref to the input
              className="input is-fullwidth"
              type="text"
              placeholder="Ingrese nombre o código del helado"
              value={searchTerm}
              onKeyDown={(e) => handleEnterKeyPress(e)}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="button is-danger ml-2"
            onClick={handleClearSearch} // Use the new handler for clearing and focusing
          >
            <i className="fa-solid fa-eraser has-text-white"></i>
          </button>
        </div>
        <table className="table is-fullwidth is-bordered is-striped">
          <thead>
            <tr>
              <th className="has-text-centered">
                <i className="fa fa-ice-cream mr-1" aria-hidden="true"></i>
                Nombre Del Helado
              </th>
              <th className="has-text-centered ">Cantidad</th>
              <th className="has-text-centered">Precio x Caja</th>
              <th className="has-text-centered">Precio Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredHelados.length > 0 ? (
              filteredHelados.map((helado, index) => (
                <tr key={helado.barcode || helado.id}>
                  <td className="has-text-centered">{helado.helado}</td>
                  <td className="has-text-centered" style={{ width: "30px" }}>
                    <div className="control">
                      <input
                        ref={(el) => (inputRefs.current[index] = el)}
                        className="input"
                        style={{ fontSize: "1.1rem" }}
                        type="text"
                        value={helado.cantidad ?? ""}
                        maxLength={3}
                        required
                        onChange={(e) =>
                          handleCantidadChange(helado.barcode, e.target.value)
                        }
                        onKeyUp={handleKeyRelease}
                        onKeyDown={(e) => handleKeyPress(e, helado.barcode)}
                      />
                    </div>
                  </td>
                  <td className="has-text-centered">
                    {formatCurrency(
                      esCompraOsorno ? helado.precioCompra : helado.precioVenta
                    )}
                  </td>
                  <td className="has-text-centered">
                    {formatCurrency(
                      (esCompraOsorno
                        ? helado.precioCompra
                        : helado.precioVenta) *
                        (parseFloat(helado.cantidad as string) || 0)
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="has-text-centered">
                  {helados.length > 0
                    ? "No hay resultados."
                    : "Cargando datos..."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
);

export default POSProductsTable;
