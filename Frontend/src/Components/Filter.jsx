import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import "./../Styles/Filter.css";

const Filter = () => {
  const filters = [
    { name: "Title", value: "title" },
    { name: "Author", value: "author" },
    { name: "Category", value: "category" },
    { name: "Publication Date", value: "publicationDate" },
    { name: "Available", value: "available" },
    { name: "Min Reviews", value: "minReviews" },
    { name: "Max Reviews", value: "maxReviews" },
  ];
  const selectedFilters = [];
  const handleSelect = () => {};
  return (
    <div className="filter-container">
      <div className="selected-filter"></div>
      <div className="filter-button">
        <button onClick={handleSelect}>
          Add Filter <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Filter;
