import React from "react";

interface SearchFieldProps {
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchField: React.FC<SearchFieldProps> = ({ handleSearchChange }) => (
  <div className="field column is-9">
    <label className="label" htmlFor="txtSearch">
      Buscar disfraz
    </label>
    <p className="control has-icons-left has-icons-right">
      <input
        type="text"
        placeholder="Búsqueda"
        id="txtSearch"
        onChange={handleSearchChange}
        className="input has-text-black"
      />
      <span className="icon is-small is-left">
        <i className="fas fa-search"></i>
      </span>
    </p>
  </div>
);

export default SearchField;
