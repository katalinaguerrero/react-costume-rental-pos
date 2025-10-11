import styles from "./Product.module.css";

function ProductCard() {
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by4">
          <img
            src="https://instagram.fzal1-1.fna.fbcdn.net/v/t39.30808-6/411193580_18007017665175212_3410172115430993918_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMDgweDEwODAuc2RyLmYzMDgwOC5kZWZhdWx0X2ltYWdlIn0&_nc_ht=instagram.fzal1-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=m_g_veL_yJsQ7kNvgGaiB9g&_nc_gid=0e9918f4e5e44054a03682ecd50c6b5c&edm=ALQROFkAAAAA&ccb=7-5&ig_cache_key=MzI1NzYwMzI4OTc5MTcwMDEzOA%3D%3D.3-ccb7-5&oh=00_AYBnWxCXKb0vKjLeT9SltkHDHNpROErg0IEzleithErGjw&oe=673D8A4D&_nc_sid=fc8dfb"
            alt="Placeholder image"
          />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <div className="is-flex is-justify-content-space-between is-align-items-center">
            <b className={`${styles.title}`}>Palo Palito</b>
            <b>$ 8.000</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
