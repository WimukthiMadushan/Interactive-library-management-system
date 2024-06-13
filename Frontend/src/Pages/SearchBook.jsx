import React, { useState } from "react";
import SideBar from "../Components/SideBar";
import "./../Styles/SearchBook.css";

function SearchBook() {
  const [items, setItems] = useState([
    {
      title: "book1",
    },
    {
      title: "book2",
    },
    {
      title: "book3",
    },
  ]); // [book1, book2, book3, ...]

  const [searchState, setSearchState] = useState({
    inputValue: "",
    searchTerm: "",
  });

  const handleChange = (event) => {
    setSearchState({
      ...searchState,
      inputValue: event.target.value,
    });
  };
  const handleSearch = () => {
    setSearchState({
      ...searchState,
      searchTerm: searchState.inputValue,
    });
    console.log(searchState.inputValue);
  };

  const [filters, setFilters] = useState({
    title: false,
    author: false,
    category: "",
    publicationDate: "",
    available: false,
    minReviews: 0,
    maxReviews: 100,
  });

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    console.log(updatedFilters);
  };

  return (
    <div className="search-container">
      <div className="left">
        <SideBar onFilterChange={handleFilterChange} />
      </div>
      <div className="right">
        <div className="search-box">
          <input
            className="search-books"
            type="text"
            placeholder="Search for books"
            value={searchState.inputValue}
            onChange={handleChange}
          />
          <button className="search-books-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="display-books">
          {/*
          
          {items.map((item) => (
            <div className="book">
              <img src={item.image} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.author}</p>
              <p>{item.category}</p>
              <p>{item.publicationDate}</p>
              <p>{item.available ? "Available" : "Not Available"}</p>
              <p>{item.reviews} reviews</p>
            </div>
          ))}*/}
        </div>
      </div>
    </div>
  );
}

export default SearchBook;
