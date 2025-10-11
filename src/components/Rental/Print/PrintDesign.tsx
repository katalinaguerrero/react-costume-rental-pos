import { getFormattedDate } from "utils/date.utils";
import { formatCurrency } from "utils/number.utils";

type RentalData = {
  clientName: string;
  costume: string;
  rentalValue: number;
  guarantee: number;
  rentalDate: { seconds: number } | Date | null;
  id: string;
};

export const generatePrintContentRental = (rentalData: RentalData | null) => {
  if (!rentalData) return "";

  return `
 <html>
  <head>
    <title>Print Voucher</title>
    <style>
      body {
        font-family: Courier, monospace;
        margin: 0;
        padding: 0;
        font-size: 10px;
      }
      .header, .footer {
        text-align: center;
        margin: 0;
        padding: 5px 0;
      }
      .header h1, .header h2 {
        margin: 0;
      }
      .header h1 {
        font-size: 16px; /* Tamaño grande */
        font-weight: bold;
      }
      .header h2, .content h3 {
        font-size: 12px; /* Tamaño mediano */
      }
      .content {
        padding: 5px;
      }
      .table {
        width: 100%;
        margin: 5px 0;
        border-collapse: collapse;
        font-size: 12px; /* Tamaño grande para la tabla */
        text-transform: uppercase;
      }
      .table th, .table td {
        padding: 4px 0;
        border-bottom: 1px solid #000;
        text-align: left;
        font-size: 1.5rem;
      }
      .footer p {
        margin: 3px 0;
        font-size: 8px;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>Comercial Mary</h1>
      <h2>Comprobante de Arriendo</h2>
      <h2>${getFormattedDate(rentalData.rentalDate)}</h2>
    </div>
    <div class="content">
      <table class="table">
        <tr>
          <th>Cliente</th>
          <td>${rentalData.clientName}</td>
        </tr>
        <tr>
          <th>Disfraz</th>
          <td>${rentalData.costume}</td>
        </tr>
        <tr>
          <th>Valor</th>
          <td>${formatCurrency(rentalData.rentalValue)}</td>
        </tr>
        <tr>
          <th>Garantía</th>
          <td>${formatCurrency(rentalData.guarantee)}</td>
        </tr>
      </table>
    </div>
    <div class="footer">
      <p>Gracias por su preferencia</p>
      <p>${rentalData.id}</p>
    </div>
  </body>
</html>
  `;
};
