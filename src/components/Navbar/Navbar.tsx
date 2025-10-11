import { Link } from "react-router-dom";
import { useEffect } from "react";
import styles from "./Navbar.module.css";
import { routes } from "constants/routes";

const Navbar: React.FC = () => {
  useEffect(() => {
    // JavaScript para manejar la funcionalidad de la navbar-burger
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll(".navbar-burger"),
      0
    );

    // Añadir evento de clic a cada uno
    $navbarBurgers.forEach((el: HTMLElement) => {
      el.addEventListener("click", () => {
        const target = el.getAttribute("data-target");
        const $target = document.getElementById(target || "");

        // Alternar la clase "is-active" en el burger y el menú
        if (el && $target) {
          el.classList.toggle("is-active");
          $target.classList.toggle("is-active");
        }
      });
    });

    // Cleanup event listeners cuando el componente se desmonte
    return () => {
      $navbarBurgers.forEach((el: HTMLElement) => {
        el.removeEventListener("click", () => {});
      });
    };
  }, []);

  return (
    <nav
      className={`${styles.navbar} navbar`}
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link className="navbar-item" to="/">
          <img src="./favicon.ico" />
        </Link>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          {routes
            .filter((route) => route.showInNavBar)
            .map((route, index) => (
              <Link key={index} className="navbar-item" to={route.path}>
                {route.navbarTitle}
              </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
