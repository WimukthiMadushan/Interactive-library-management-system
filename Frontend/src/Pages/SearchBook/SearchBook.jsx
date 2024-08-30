import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./SearchBook.css";
import Pagination from "../../Components/Pagination/Pagination";
import { FcFilledFilter } from "react-icons/fc";
import { StoreContext } from "../../Hooks/StoreContext";
import Filters from "../../Components/Filters/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function SearchBook() {
  const [Books, setBooks] = useState([]);
  const [searchTitleState, setSearchTitleState] = useState("");
  const [searchAuthorState, setSearchAuthorState] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [clickFilters, setClickFilters] = useState(false);
  const { publisherOptions, authorOptions, categoryOptions } =
    useContext(StoreContext);
  const [appliedFilters, setAppliedFilters] = useState({
    category: [],
    start: null,
    end: null,
    range: null,
  });

  const handleChange = (selected) => {
    setSelectedCategories(selected || []);
  };

  const toggleFilterPopup = () => {
    setClickFilters(!clickFilters);
  };

  const handleFilterSubmit = async (data) => {
    setAppliedFilters((prevFilters) => {
      const mergedFilters = {
        ...prevFilters,
        ...data,
        category: [...prevFilters.category, ...(data.category || [])],
      };
      return mergedFilters;
    });
  };

  const removeFilter = (filterType, value) => {
    setAppliedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (filterType === "category") {
        updatedFilters.category = updatedFilters.category.filter(
          (cat) => cat.value !== value
        );
      } else if (filterType === "date") {
        updatedFilters.start = null;
        updatedFilters.end = null;
      } else if (filterType === "rating") {
        updatedFilters.range = null;
      }
      return updatedFilters;
    });
  };

  // for advanced filters
  useEffect(() => {
    const fetchBooks = async (filters) => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/book/advanced",
          filters
        );
        setBooks(response.data);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    if (appliedFilters) {
      fetchBooks(appliedFilters);
    }
  }, [appliedFilters]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/book/list");
        setBooks(response.data);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredData = async () => {
      try {
        let apiUrl = "http://localhost:5000/api/book/filters?";
        const params = [];

        if (searchTitleState.length > 0)
          params.push(`title=${encodeURIComponent(searchTitleState)}`);

        if (searchAuthorState.length > 0)
          params.push(`author=${encodeURIComponent(searchAuthorState)}`);

        if (selectedCategories.length > 0)
          params.push(
            `categories=${selectedCategories
              .map((cat) => encodeURIComponent(cat.label))
              .join(",")}`
          );

        const response = await axios.get(apiUrl + params.join("&"));
        setBooks(response.data);
      } catch (error) {
        console.log("Error fetching filtered data:", error.message);
      }
    };
    fetchFilteredData();
  }, [searchTitleState, searchAuthorState, selectedCategories]);

  return (
    <div className="search-container fade-in">
      <div className="search-boxes">
        <input
          type="text"
          placeholder="Search by Title"
          className="search-input"
          value={searchTitleState}
          onChange={(e) => setSearchTitleState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search By Author"
          className="search-input"
          value={searchAuthorState}
          onChange={(e) => setSearchAuthorState(e.target.value)}
        />
      </div>
      <div className="filters-container">
        <div
          className={`filters ${clickFilters ? "animated" : ""}`}
          onClick={() => setClickFilters(!clickFilters)}
        >
          <FcFilledFilter size={"3rem"} />
          <p>Filters</p>
        </div>
        {clickFilters && (
          <div className="filter-options">
            <Filters
              togglePopup={toggleFilterPopup}
              onApply={handleFilterSubmit}
            />
          </div>
        )}

        {appliedFilters && (
          <div className="applied-filters">
            {appliedFilters.start && appliedFilters.end && (
              <div className="filter-item">
                Date Range: {appliedFilters.start} to {appliedFilters.end}
                <span className="cross-icon">
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => removeFilter("date")}
                  />
                </span>
              </div>
            )}
            {appliedFilters.category.map((cat) => (
              <div className="filter-item" key={cat.value}>
                {cat.label}
                <span className="cross-icon">
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => removeFilter("category", cat.value)}
                  />
                </span>
              </div>
            ))}
            {appliedFilters.range && (
              <div className="filter-item">
                Rating: {appliedFilters.range[0]} to {appliedFilters.range[1]}
                <span className="cross-icon">
                  <FontAwesomeIcon
                    icon={faXmark}
                    onClick={() => removeFilter("rating")}
                  />
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="display-books">
        <Pagination Data={Books} itemsPerPage={49} />
      </div>
    </div>
  );
}

export default SearchBook;
