import { IceCream, Totals } from "types";
import { getFormattedDate } from "utils/date.utils";
import { formatCurrency } from "utils/number.utils";

export const generatePrintContentRental = (
  helados: IceCream[] | null,
  totals: Totals,
  esCompraOsorno: boolean
) => {
  if (!helados) return "";

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

      .center-text {
        text-align: center;
      }

      .padding-5 {
        padding: 5px 0;
      }

      .header h1,
      .header h2 {
        font-size: 12px;
        font-weight: bold;
        margin: 0;
      }

      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 10px;
      }

      .table th, .table td {
        padding: 3px;
        border-bottom: 1px solid #000;
        text-align: left;
      }

      .table th {
        text-align: left;
        padding-left: 5px;
      }

      .totals-row {
        font-weight: bold;
        border-top: 1px solid #000;
      }

      .footer p {
        font-size: 10px;
        margin: 2px 0;
      }
    </style>
  </head>
  <body>
    <div class="header center-text">
      ${
        !esCompraOsorno
          ? `<h1>Comercial Mary</h1><h2>Detalle Venta de Helados</h2>`
          : ""
      }
      <h2>${esCompraOsorno ? "Compra " : ""}${getFormattedDate(new Date())}</h2>
    </div>

    <div class="content">
      <table class="table">
        <tr>
          <th>Helado</th>
          <th>Cant. - Precios</th>
        </tr>
        ${helados
          .map(
            (helado) => `
          <tr>
            <td>${helado.helado}</td>
            <td style="text-align:right"><b>${
              helado.cantidad
            }</b> x ${formatCurrency(
              esCompraOsorno ? helado.precioCompra : helado.precioVenta
            )}</td>
          </tr>
          <tr>
            <td></td>
            <th style="text-align:right">${formatCurrency(
              Number(helado.cantidad) *
                (esCompraOsorno ? helado.precioCompra : helado.precioVenta)
            )}</th>
          </tr>`
          )
          .join("")}

        <tr class="totals-row">
          <th>N° Cajas</th>
          <td style="text-align:right">${totals.totalQuantity}</td>
        </tr>

        <tr class="totals-row">
          <th>Total</th>
          <th style="text-align:right">${formatCurrency(
            esCompraOsorno ? totals.totalPriceToBuy : totals.totalPriceToSell
          )}</th>
        </tr>
      </table>
    </div>
  </body>
</html>
  `;
};
