import { formatCurrency } from "utils/number.utils";
import { IceCream } from "types";
import TransactionType from "components/Sales/POSMode/Elements/TransactionType";
import { useRef } from "react";
import { getNowFormattedDate } from "utils/date.utils";
import { toJpeg } from "html-to-image";
import { saveCompras, saveVentas } from "services/products/productServices";
import styles from "components/Sales/POSMode/Styles/POSMode.module.css";

interface POSSummaryTableProps {
  filteredHelados: IceCream[];
  esCompraOsorno: boolean;
}

const POSSummaryTable = ({
  filteredHelados,
  esCompraOsorno,
}: POSSummaryTableProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleExportJpg = () => {
    if (contentRef.current) {
      toJpeg(contentRef.current, {
        quality: 0.95,
        filter: (node) => !node.classList?.contains("hide-on-export"), // Replace with your class
      })
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.download = `${getNowFormattedDate()}.jpg`;
          link.href = dataUrl;
          link.click();
        })
        .catch((error) => {
          console.error("Error exporting to JPG:", error);
        });
    }
  };
  const guardarDatos = () => {
    esCompraOsorno ? saveCompras(filteredHelados) : saveVentas(filteredHelados);
  };
  return (
    <div>
      <div className={`table-container`}>
        <h4 className="title is-5">
          <i className="fa-solid fa-money-check-dollar mr-1"></i>
          Resumen <TransactionType isSellOrPurchase={esCompraOsorno} />
          de Helados
        </h4>

        <div ref={contentRef}>
          <table className="table is-fullwidth is-bordered is-striped">
            <thead>
              <tr>
                <th className="has-text-centered">Helado</th>
                <th className="has-text-centered">Cantidad</th>
                <th className="has-text-centered hide-on-export">
                  Precio Total
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredHelados.map((helado) => (
                <tr key={helado.id}>
                  <td className="has-text-centered">{helado.helado}</td>
                  <td className="has-text-centered">{helado.cantidad}</td>
                  <td className="has-text-centered hide-on-export">
                    {formatCurrency(
                      (parseInt(helado.cantidad as string) || 0) *
                        (esCompraOsorno
                          ? helado.precioCompra
                          : helado.precioVenta)
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filteredHelados.length > 0 ? (
        <div className="buttons mt-2">
          <button
            className={`button is-fullwidth is-small ${styles.iconColor}`}
            onClick={handleExportJpg}
          >
            <i className={`fa-solid fa-image mr-1 ${styles.iconColor}`}></i>{" "}
            Descargar Imagen
          </button>
          <button
            className={`button is-fullwidth is-small ${styles.iconColor}`}
            onClick={guardarDatos}
          >
            <i className={`fa-solid fa-cloud mr-1 ${styles.iconColor}`}></i>
            Guardar Datos en línea
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default POSSummaryTable;
