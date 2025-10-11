import React from "react";
import Voucher from "components/Rental/Print/Voucher";
import { Rental } from "./RentalWrap";
import styles from "./List.module.css";
import { getFormattedDate } from "utils/date.utils";
import { formatCurrency } from "utils/number.utils";

interface RentalTableProps {
  rentals: Rental[];
  updateReturnedState: (rental: Rental) => void;
}
const RentalTable: React.FC<RentalTableProps> = ({
  rentals,
  updateReturnedState,
}) => {
  return (
    <div className={`${styles.table} table-container`}>
      <table className="table is-fullwidth is-bordered is-striped">
        <thead>
          <tr>
            <th className="has-text-centered">
              <i className="fa fa-print" aria-hidden="true"></i>
            </th>
            <th title="¿Disfraz Devuelto?">Dev?</th>
            <th>Disfraz</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Valor</th>
            <th>Garantía</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr
              key={rental.id}
              onClick={() => (window.location.href = `/arriendo/${rental.id}`)}
              title={rental.id}
            >
              <td
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el evento en <tr> se dispare
                }}
              >
                <Voucher costumeId={rental.id} />
              </td>
              <td
                className="devuelto has-text-centered"
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el evento en <tr> se dispare
                  updateReturnedState(rental);
                }}
              >
                {rental.returned ? (
                  <i className="fa fa-check has-text-success"></i>
                ) : (
                  <i className="fa fa-times has-text-danger"></i>
                )}
              </td>
              <td>{rental.costume}</td>
              <td>{rental.clientName}</td>
              <td>
                {rental.rentalDate
                  ? getFormattedDate(rental.rentalDate)
                  : "Fecha no disponible"}
              </td>
              <td>{formatCurrency(rental.rentalValue)}</td>
              <td>{formatCurrency(rental.guarantee)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RentalTable;
