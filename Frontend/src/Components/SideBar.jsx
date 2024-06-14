import React from "react";
import { useState } from "react";
import "./../Styles/SideBar.css";

function SideBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    title: false,
    author: false,
    category: "",
    publicationDate: "",
    available: false,
    minReviews: 0,
    maxReviews: 100,
  });
  const categories = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Sci-Fi",
    "Fantasy",
    "Horror",
    "Self-Help",
    "Biography",
    "Autobiography",
    "History",
    "Science",
    "Travel",
    "Cooking",
    "Art",
    "Photography",
    "Children",
    "Young-Adult",
    "Comics",
    "Manga",
    "Poetry",
    "Drama",
    "Religion",
    "Philosophy",
    "Psychology",
    "Health",
    "Fitness",
    "Sports",
    "Education",
    "Reference",
    "Technology",
    "Programming",
    "Web-Development",
    "Business",
    "Economics",
    "Finance",
    "Marketing",
    "Management",
    "Leadership",
    "Politics",
    "Sociology",
    "Anthropology",
  ];

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

      {/* category */}
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
            <option key={index} value={category}>
              {category}
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

      {/* Availability
      <div className="filter-group">
        <label>
          <input
            type="radio"
            name="available"
            checked={filters.available}
            onChange={handleFilterChange}
          />
          Available
        </label>
      </div> */}

      {/* Reviews Range */}
      <div className="filter-group">
        <label>Reviews Range:</label>
        <div>
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
