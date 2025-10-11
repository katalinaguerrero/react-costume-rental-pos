import { IceCream } from "types";
import PrintButton from "components/Sales/POSMode/Print/PrintButton";
import styles from "components/Sales/POSMode/Styles/POSMode.module.css";

interface ToolbarProps {
  clearFields: () => void;
  filteredHelados: IceCream[];
  esCompraOsorno: boolean;
}

const Toolbar = ({
  clearFields,
  filteredHelados,
  esCompraOsorno,
}: ToolbarProps) => {
  return (
    <div className="buttons mb-5 ">
      <button
        className={`button ${styles.largerButton}`}
        onClick={clearFields}
        disabled={filteredHelados?.length == 0}
      >
        <i className={`fa-solid fa-eraser mr-1 ${styles.iconColor}`}></i>{" "}
        Limpiar Cantidad
      </button>
      <PrintButton
        filteredHelados={filteredHelados}
        esCompraOsorno={esCompraOsorno}
        classForButton={styles.largerButton}
        classForIcon={styles.iconColor}
      />
    </div>
  );
};

export default Toolbar;
