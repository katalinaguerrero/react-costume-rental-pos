import React from "react";
import styles from "./List.module.css"; // Adjust the path according to your project structure

interface FilterButtonsProps {
  applyFilter: (filter: "all" | "returned" | "notReturned") => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ applyFilter }) => (
  <div
    className={`column ${styles.gridActions} is-justify-content-space-between`}
  >
    <label>Mostrar Disfraces</label>
    <div className="buttons">
      {["Todos", "Devueltos", "No Devueltos"].map((label, index) => (
        <button
          key={index}
          className={`${styles.buttonPrimary} button`}
          onClick={() =>
            applyFilter(
              label === "Todos"
                ? "all"
                : label === "Devueltos"
                ? "returned"
                : "notReturned"
            )
          }
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);

export default FilterButtons;
