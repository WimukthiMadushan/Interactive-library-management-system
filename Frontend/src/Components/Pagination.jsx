import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../Styles/Pagination.css";

const Pagination = ({ Data, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(Data.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Function to slice data based on current page
  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return Data.slice(startIndex, endIndex);
  };

  const renderPages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, start + 4);

    for (let i = start; i <= end; i++) {
      pages.push(
        <div
          key={i}
          className={`pagination-item ${i === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </div>
      );
    }

    return pages;
  };

  const renderItems = () => {
    const currentItems = getCurrentItems();

    return currentItems.map((item, index) => (
      <Link
        key={index}
        to={`/book/${item.Book_ID}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div key={index} className="item">
          <img src={item.Image_Path} alt={item.Title} />
          <div className="item-details">
            <h3>{item.Title}</h3>
            <p>
              By {item.Author_First_Name} {item.Author_Last_Name}
            </p>
            <p>Category: {item.Category_Name}</p>
          </div>
        </div>
      </Link>
    ));
  };

  return (
    <div className="pagination-container">
      <div className="items-container">{renderItems()}</div>
      <div className="pagination">
        <div
          className={`pagination-item ${currentPage === 1 ? "disabled" : ""}`}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {"Previous"}
        </div>
        {renderPages()}
        <div
          className={`pagination-item ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {"Next"}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
