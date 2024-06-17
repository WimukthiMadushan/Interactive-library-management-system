import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import "./../Styles/SideBar.css";

function SideBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    title: false,
    author: false,
    category: "",
    language: "",
    publisher: "",
    publicationDate: "",
    minReviews: 0,
    maxReviews: 0,
  });
  const [categories, setCategories] = useState([]);
  const [languages, setlanguages] = useState([]);
  const [publishers, setPublishers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/");
        console.log(response.data);
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories:", error.message);
      }
    };
    fetchData();
  }, []);

  {
    /*
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/languages");
        setlanguages(response.data);
      } catch (error) {
        console.log("Error fetching categories:", error.message);
      }
    };
    fetchData();
  }, []);


  */
  }

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    //console.log(name, value, type, checked);
    const filterValue = type === "radio" ? checked : value;

    const newFilters = {
      ...filters,
      [name]: filterValue,
    };
    // Ensure "Title" and "Author" are mutually exclusive
    if (name === "title" && checked) {
      newFilters.author = false;
    } else if (name === "author" && checked) {
      newFilters.title = false;
    }

    setFilters(newFilters);
    // Pass the updated filters to the parent component
    onFilterChange(newFilters);
  };

  return (
    <div className="sidebar">
      <h1>Filters</h1>
      {/* Search By */}
      <div className="wrapper">
        <input
          type="radio"
          name="title"
          id="option-1"
          checked={filters.title}
          onChange={handleFilterChange}
        />
        <input
          type="radio"
          name="author"
          id="option-2"
          checked={filters.author}
          onChange={handleFilterChange}
        />
        <label htmlFor="option-1" className="option option-1">
          <div className="dot"></div>
          <span>Title</span>
        </label>
        <label htmlFor="option-2" className="option option-2">
          <div className="dot"></div>
          <span>Author</span>
        </label>
      </div>
      {/* Language */}
      <div className="filter-group">
        <select
          className="category-select"
          name="language"
          value={filters.language}
          onChange={handleFilterChange}
        >
          <option className="initial-category" value="">
            Select Language
          </option>
          {languages.map((language, index) => (
            <option key={index} value={language}>
              {language}
            </option>
          ))}
        </select>
      </div>
      {/* Category */}
      <div className="filter-group">
        <select
          className="category-select"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option className="initial-category" value="">
            Select Category
          </option>
          {categories.map((category, index) => (
            <option key={category.Cat_ID} value={category}>
              {category.Cat_Name}
            </option>
          ))}
        </select>
      </div>

      {/* Publication Date */}
      <div className="filter-group">
        <input
          className="date-input"
          type="date"
          name="publicationDate"
          value={filters.publicationDate}
          onChange={handleFilterChange}
        />
      </div>
      {/* Reviews Range */}
      <div className="filter-group">
        <label>Reviews Range:</label>
        <div className="reviews-range">
          <label>
            Min:
            <input
              type="number"
              name="minReviews"
              value={filters.minReviews}
              onChange={handleFilterChange}
            />
          </label>
          <label>
            Max:
            <input
              type="number"
              name="maxReviews"
              value={filters.maxReviews}
              onChange={handleFilterChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
