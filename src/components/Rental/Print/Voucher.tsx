import { useState, useRef, useEffect, useCallback } from "react";
import styles from "./Print.module.css";
import { getRentalById } from "services/rentals/rentalServices";
import { generatePrintContentRental } from "./PrintDesign";

type VoucherProps = {
  costumeId: string;
  text?: string;
  saving?: boolean;
};

const Voucher: React.FC<VoucherProps> = ({ costumeId, text, saving }) => {
  const [rentalData, setRentalData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const loadedCostumeId = useRef<string | null>(null);
  const [shouldPrint, setShouldPrint] = useState(false);

  const fetchRentalData = useCallback(async () => {
    if (costumeId && loadedCostumeId.current !== costumeId) {
      setLoading(true);
      try {
        const data = await getRentalById(costumeId);
        setRentalData(data);
        loadedCostumeId.current = costumeId;
      } catch (error) {
        console.error("Error fetching rental data:", error);
      } finally {
        setLoading(false);
      }
    }
  }, [costumeId]);

  useEffect(() => {
    if (shouldPrint && rentalData) {
      handlePrint();
      setShouldPrint(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldPrint, rentalData]);

  const handlePrint = () => {
    if (rentalData && iframeRef.current) {
      const printWindow = iframeRef.current.contentWindow;
      const doc = printWindow?.document;

      if (doc) {
        doc.open();
        doc.write(generatePrintContentRental(rentalData));
        doc.close();

        printWindow?.focus();
        printWindow?.print();
      } else {
        console.log("Iframe no cargado");
      }
    } else {
      console.log("Datos de arriendo no disponibles o iframe no cargado");
    }
  };

  const handleButtonClick = async () => {
    await fetchRentalData();
    setShouldPrint(true);
  };

  return (
    <>
      <button
        type="button"
        className={`button  ${
          text ? "mr-3 mt-5 mb-2" : styles.fullHeightButton
        }`}
        onClick={handleButtonClick}
        disabled={saving || loading} // Desactivar botón si está guardando o cargando
      >
        {saving ? (
          <span className="loading-spinner">Guardando arriendo...</span> // Indicador de carga
        ) : loading ? (
          <span className="loading-spinner">
            {text ? "Cargando..." : "..."}
          </span> // Indicador de carga al obtener datos
        ) : (
          <>
            <i
              className={`fa fa-print ${text ? "mr-2" : ""}`}
              aria-hidden="true"
            ></i>
            {text}
          </>
        )}
      </button>

      <iframe
        ref={iframeRef}
        style={{
          position: "absolute",
          width: "0px",
          height: "0px",
          border: "none",
        }}
      />
    </>
  );
};

export default Voucher;
