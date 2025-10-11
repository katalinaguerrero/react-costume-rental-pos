export interface IceCream {
  id: string;
  barcode: string;
  helado: string;
  cantidad?: number | string;
  precioVenta: number;
  precioCompra: number;
}
export interface Totals {
  totalQuantity: number;
  totalPriceToSell: number;
  totalPriceToBuy: number;
}
