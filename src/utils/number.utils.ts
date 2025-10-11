import { IceCream, Totals } from "types";

/**
 * Formats a number as Chilean currency (CLP) without decimals.
 * Replaces commas with spaces for better readability.
 *
 * @param value - The amount to format
 * @returns A string formatted like "$ 1 000"
 */
export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(value)
    .replace(/,/g, " "); // Replaces commas with space
};

/**
 * Calculates the total amount for a costume rental, including the guarantee.
 * Converts string inputs to numbers and handles invalid or empty strings.
 *
 * @param rentalValue - Rental value
 * @param guarantee - Guarantee value
 * @returns The total amount as a number
 */
export const calculateRentalTotal = (
  rentalValue: string,
  guarantee: string
): number => {
  const valueParsed: number = parseFloat(rentalValue) || 0;
  const guaranteeParsed: number = parseFloat(guarantee) || 0;
  return valueParsed + guaranteeParsed;
};

/**
 * Calculates totals for a list of ice cream products.
 * Sums quantities, total selling price, and total buying price.
 * Handles string quantities by parsing them as numbers.
 *
 * @param helados - Array of ice cream objects
 * @returns Totals including totalQuantity, totalPriceToSell, and totalPriceToBuy
 */
export const calculateIceCreamTotals = (helados: IceCream[]): Totals => {
  return helados.reduce(
    (totals, helado) => {
      totals.totalQuantity += parseInt(helado.cantidad as string) || 0;
      totals.totalPriceToSell +=
        helado.precioVenta * (parseInt(helado.cantidad as string) || 0);
      totals.totalPriceToBuy +=
        helado.precioCompra * (parseInt(helado.cantidad as string) || 0);
      return totals;
    },
    { totalQuantity: 0, totalPriceToSell: 0, totalPriceToBuy: 0 }
  );
};
