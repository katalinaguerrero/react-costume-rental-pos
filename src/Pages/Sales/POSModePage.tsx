import { useRef, useState } from "react";
import ProductsTable from "components/Sales/POSMode/Tables/POSProductsTable";
import SummaryTable from "components/Sales/POSMode/Tables/POSSummaryTable";
import TotalSummaryTable from "components/Sales/POSMode/Tables/POSTotalSummaryTable";
import { IceCream } from "types";
import Toolbar from "components/Sales/POSMode/Elements/Toolbar";
import ScrollToTop from "react-scroll-to-top";
import TransactionType from "components/Sales/POSMode/Elements/TransactionType";
import styles from "components/Sales/POSMode/Styles/POSMode.module.css";
interface POSModePageProps {
  esCompra?: boolean;
}

const POSModePage: React.FC<POSModePageProps> = ({
  esCompra: esCompraOsorno = false,
}) => {
  const [filteredData, setFilteredData] = useState<IceCream[]>([]);

  function handleDataFromChild(data: IceCream[]) {
    setFilteredData(data);
  }

  const productsTableRef = useRef<{ clearQuantities: () => void }>(null);

  const clearFields = () => {
    if (productsTableRef.current) {
      productsTableRef.current.clearQuantities(); // Call the method inside ProductsTable
    }
  };

  return (
    <div className={`section ${styles.black}`} style={{ fontSize: "1.4rem" }}>
      <h1 className="title">
        <i className="fa fa-ice-cream mr-1" aria-hidden="true"></i>
        Planilla
        <TransactionType isSellOrPurchase={esCompraOsorno} />
        de Helados
      </h1>
      <Toolbar
        clearFields={clearFields}
        filteredHelados={filteredData}
        esCompraOsorno={esCompraOsorno}
      />
      <div className="columns">
        <div className={`column is-7 is-full-mobile is-full-tablet`}>
          <ProductsTable
            ref={productsTableRef}
            sendDataToParent={handleDataFromChild}
            clearFields={clearFields}
            esCompraOsorno={esCompraOsorno}
          />
        </div>

        <div className="column is-5  is-full-mobile is-full-tablet">
          <TotalSummaryTable
            filteredHelados={filteredData}
            esCompraOsorno={esCompraOsorno}
          />
          <SummaryTable
            filteredHelados={filteredData}
            esCompraOsorno={esCompraOsorno}
          />
        </div>
        <div></div>
      </div>
      <ScrollToTop smooth color="#5f22d9" />
    </div>
  );
};

export default POSModePage;
