import { IceCream } from "types";

import { formatCurrency, calculateIceCreamTotals } from "utils/number.utils";
import TransactionType from "components/Sales/POSMode/Elements/TransactionType";

interface POSTotalSummaryProps {
  filteredHelados: IceCream[];
  esCompraOsorno: boolean;
}

const POSTotalSummaryTable = ({
  filteredHelados,
  esCompraOsorno,
}: POSTotalSummaryProps) => {
  const totals = calculateIceCreamTotals(filteredHelados);

  return (
    <div className={`table-container`}>
      <h4 className="title is-5">
        <i className="fa-solid fa-cash-register mr-1"></i>
        Totales <TransactionType isSellOrPurchase={esCompraOsorno} />
      </h4>
      <table className="table is-fullwidth is-bordered is-striped">
        <tbody>
          <tr>
            <th className="has-text-centered">Cantidad Cajas</th>
            <td className="has-text-centered">{totals.totalQuantity}</td>
          </tr>
          <tr>
            <th className="has-text-centered">Precio Total</th>
            <td className="has-text-centered">
              {esCompraOsorno
                ? formatCurrency(totals.totalPriceToBuy)
                : formatCurrency(totals.totalPriceToSell)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default POSTotalSummaryTable;
