import ProductCard from "components/Sales/GalleryMode/Product/ProductCard";
import styles from "./Grid.module.css";

function Grid() {
  return (
    <div className="section">
      {" "}
      <div className="columns">
        <div className={`${styles.customGrid} column is-10`}>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
        <div className="column is-2 card">
          <div className={`${styles.title} is-size-4 has-text-centered`}>
            Lista Crear Componente Detalle
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grid;
