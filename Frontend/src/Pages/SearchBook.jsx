import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../Components/SideBar";
import "./../Styles/SearchBook.css";
import Pagination from "../Components/Pagination";

function SearchBook() {
  const [searchState, setSearchState] = useState("");
  const [filters, setFilters] = useState({
    title: false,
    author: false,
    category: "",
    publicationDate: "",
    available: false,
    minReviews: 0,
    maxReviews: 0,
  });
  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = "http://localhost:5000/api/book/filters?";
        const params = [];
        if (filters.title)
          params.push(`title=${encodeURIComponent(searchState)}`);
        if (filters.author)
          params.push(`author=${encodeURIComponent(searchState)}`);
        if (filters.category)
          params.push(`category=${encodeURIComponent(filters.category)}`);
        if (filters.publicationDate)
          params.push(
            `publicationDate=${encodeURIComponent(filters.publicationDate)}`
          );
        if (filters.minReviews) params.push(`minReviews=${filters.minReviews}`);
        if (filters.maxReviews) params.push(`maxReviews=${filters.maxReviews}`);

        const response = await axios(apiUrl + params.join("&"));
        console.log(apiUrl + params.join("&"));
        setData(response.data);
        //console.log(Data);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, [filters, searchState]);

  const handleChange = (event) => {
    setSearchState(event.target.value);
  };
  const handleSearch = () => {
    //console.log("Searching for:", searchState);
  };

  const handleFilterChange = (updatedFilters) => {
    setFilters(updatedFilters);
    console.log("Updated filters:", updatedFilters);
  };
  //console.log("Data:", Data);

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
            value={searchState}
            onChange={handleChange}
          />
          <button className="search-books-button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="display-books">
          <Pagination Data={Data} itemsPerPage={10} />
        </div>
      </div>
    </div>
  );
}

export default SearchBook;
