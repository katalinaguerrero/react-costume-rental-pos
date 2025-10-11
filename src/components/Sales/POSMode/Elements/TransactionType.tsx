interface IsSellOrPurchaseProps {
  isSellOrPurchase: boolean;
}
const TransactionType = ({ isSellOrPurchase }: IsSellOrPurchaseProps) => {
  return (
    <>
      <span
        className={isSellOrPurchase ? "has-text-danger" : "has-text-success"}
      >
        {isSellOrPurchase ? " Compra " : " Venta "}
      </span>
    </>
  );
};

export default TransactionType;
