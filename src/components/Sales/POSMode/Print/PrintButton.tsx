// src/components/PrintButton.tsx

import { useRef } from "react";
import { IceCream } from "types";
import { generatePrintContentRental } from "./PrintTemplate";
import { calculateIceCreamTotals } from "utils/number.utils";

interface PrintButtonProps {
  filteredHelados: IceCream[] | null;
  esCompraOsorno: boolean;
  classForButton: string;
  classForIcon: string;
}

const PrintButton = ({
  filteredHelados,
  esCompraOsorno,
  classForButton,
  classForIcon,
}: PrintButtonProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const handlePrint = () => {
    if (filteredHelados && iframeRef.current) {
      const printWindow = iframeRef.current.contentWindow;
      const doc = printWindow?.document;

      if (doc) {
        const totals = calculateIceCreamTotals(filteredHelados);
        doc.open();
        doc.write(
          generatePrintContentRental(filteredHelados, totals, esCompraOsorno)
        );
        doc.close();

        printWindow?.focus();
        printWindow?.print();
      } else {
        console.log("Iframe not loaded.");
      }
    } else {
      console.log("Data or iframe is not available.");
    }
  };

  return (
    <>
      <button
        className={`button ${classForButton}`}
        onClick={handlePrint}
        disabled={filteredHelados == undefined || filteredHelados?.length == 0}
      >
        <i className={`fa-solid fa-receipt mr-1 ${classForIcon}`}></i> Imprimir
        Detalle
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

export default PrintButton;
