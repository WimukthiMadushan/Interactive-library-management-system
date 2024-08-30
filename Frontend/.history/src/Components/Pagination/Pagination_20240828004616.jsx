import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Pagination.css";

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

  // Function to render the pagination buttons
  const renderPages = () => {
    const pages = [];
    const start = Math.max(1, currentPage - 1);
    const end = Math.min(totalPages, start + 2);

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

  // Function to render items based on current page
  const renderItems = () => {
    const currentItems = getCurrentItems();

    return currentItems.map((item, index) => (
      <Link
        key={index}
        to={`/book/${item.Book_ID}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div key={index} className="item">
          <div className="item-image-container">
            {item.Image_Path ? (
              <img
                src={item.Image_Path}
                alt={item.Title}
                className="item-image"
              />
            ) : item.Image_Name ? (
              <img
                src={`http://localhost:5001/books/${item.Image_Name}`}
                alt={item.Title}
                className="item-image"
              />
            ) : (
              <div className="no-image">
                <p>No image</p>
              </div>
            )}
          </div>
          <div className="item-details">
            <h3>{item.Title}</h3>
            <p className="author-name">
              By {item.Author_First_Name} {item.Author_Last_Name}
            </p>
            <p className="category">Category: {item.Category_Name}</p>
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
