import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./SearchBook.css";
import Pagination from "../../Components/Pagination/Pagination";
import { FcFilledFilter } from "react-icons/fc";
import Select from "react-select";
import { StoreContext } from "../../Hooks/StoreContext";

const customStyles = {
  control: (provided) => ({
    ...provided,
    display: "flex",
    flexDirection: "row-reverse",
    minHeight: "36px",
    height: "36px",
    width: "15rem",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "36px",
    display: "none",
  }),
  valueContainer: (provided) => ({
    ...provided,
    display: "flex",
    padding: "0 12px 0 0",
    flexDirection: "row",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0",
    padding: "0",
  }),
  placeholder: (provided) => ({
    ...provided,
    margin: "2px 10px",
    padding: "0",
    flex: "1",
  }),
  singleValue: (provided) => ({
    ...provided,
    margin: "0px 10px 0px 10px",
    padding: "0",
    lineHeight: "36px",
    width: "100%",
  }),
  container: (provided) => ({
    ...provided,
    width: "300px",
  }),
};

function SearchBook() {
  const [Books, setBooks] = useState([]);
  const [searchTitleState, setSearchTitleState] = useState("");
  const [searchAuthorState, setSearchAuthorState] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [clickFilters, setClickFilters] = useState(false);
  const { publisherOptions, authorOptions, categoryOptions } =
    useContext(StoreContext);

  const handleChange = (selected) => {
    setSelectedCategories(selected || []);
  };

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
            <Select
              isMulti
              options={categoryOptions}
              styles={customStyles}
              onChange={handleChange}
              placeholder="Select Category"
              value={selectedCategories}
            />
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
