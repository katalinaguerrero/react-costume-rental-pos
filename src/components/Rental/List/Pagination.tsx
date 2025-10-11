import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  totalCount: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  totalCount,
  onPageChange,
}) => {
  return (
    <div
      className="pagination is-rounded is-right"
      role="navigation"
      aria-label="pagination"
    >
      <button
        className="pagination-previous button"
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        Anterior
      </button>
      <button
        className="pagination-next button"
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
      <span>
        Página {currentPage} de {totalPages}
      </span>
      <span>N° Total de registros: {totalCount}</span>
    </div>
  );
};

export default Pagination;
