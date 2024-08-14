// PaginationButtons.js
import React from "react";
import "./../Styles/PaginationButtons.css";
const PaginationButtons = ({ currentPage, totalPages, onPageChange }) => {
  const maxButtonsToShow = 3;
  const halfRange = Math.floor(maxButtonsToShow / 2);

  let startPage = Math.max(1, currentPage - halfRange);
  let endPage = Math.min(totalPages, currentPage + halfRange);

  if (currentPage <= halfRange) {
    endPage = Math.min(totalPages, maxButtonsToShow);
  } else if (currentPage + halfRange >= totalPages) {
    startPage = Math.max(1, totalPages - maxButtonsToShow + 1);
  }

  const buttons = [];

  if (startPage > 1) {
    buttons.push(
      <button
        key="prev"
        className="PaginationButtons-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>
    );
  }

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <button
        key={i}
        className={`PaginationButtons-button ${
          currentPage === i ? "active" : ""
        }`}
        onClick={() => onPageChange(i)}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) {
    buttons.push(
      <button
        key="next"
        className="PaginationButtons-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    );
  }

  return <div className="PaginationButtons-container">{buttons}</div>;
};

export default PaginationButtons;
