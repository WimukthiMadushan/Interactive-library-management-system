import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { useAuth } from "./../Hooks/AuthContext.jsx";
import "./../Styles/SideBar.css";
import Profile_pic from "./../Images/Profile_pic.jpg";

function SideBar({ onFilterChange }) {
  const [filters, setFilters] = useState({
    title: false,
    author: false,
    category: "",
    publisher: "",
    publicationDateStart: "",
    publicationDateEnd: "",
    minReviews: 0,
    maxReviews: 5,
  });
  const [categories, setCategories] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState({});

  const { authState, logout } = useAuth();
  const { userId } = authState;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/category/");
        setCategories(response.data);
      } catch (error) {
        console.log("Error fetching categories:", error.message);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.log("Error fetching user:", error.message);
      }
    };
    fetchUser();
  }, [userId]);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    const filterValue = type === "radio" ? checked : value;

    const newFilters = {
      ...filters,
      [name]: filterValue,
    };

    if (name === "title" && checked) {
      newFilters.author = false;
    } else if (name === "author" && checked) {
      newFilters.title = false;
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      title: false,
      author: false,
      category: "",
      publisher: "",
      publicationDateStart: "",
      publicationDateEnd: "",
      minReviews: 0,
      maxReviews: 5,
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="user-details" onClick={toggleSidebar}>
        {userId ? (
          <>
            <img src={Profile_pic} alt="User" />
            <div className="user-info">
              <Link
                to={"/profile"}
                style={{ textDecoration: "none", color: "black" }}
              >
                <span className={`name ${isCollapsed ? "hidden" : ""}`}>
                  {user.First_Name} {user.Last_Name}
                </span>
              </Link>

              <span className={`status ${isCollapsed ? "hidden" : ""}`}>
                @{user.Username}
              </span>
            </div>
          </>
        ) : (
          <FaUserCircle className="user-icon" />
        )}
      </div>

      <div className="upper">
        <h1 className={isCollapsed ? "hidden" : ""}>Filters</h1>
      </div>

      <div className={`wrapper ${isCollapsed ? "hidden" : ""}`}>
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

      <div className={`filter-group ${isCollapsed ? "hidden" : ""}`}>
        <select
          className="category-select"
          name="category"
          value={filters.category}
          onChange={handleFilterChange}
        >
          <option className="initial-category" value="">
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category.Cat_ID} value={category.Cat_Name}>
              {category.Cat_Name}
            </option>
          ))}
        </select>
      </div>

      <div className={`filter-group ${isCollapsed ? "hidden" : ""}`}>
        <input
          className="publisher-input"
          type="text"
          name="publisher"
          placeholder="Publisher"
          value={filters.publisher}
          onChange={handleFilterChange}
        />
      </div>

      <div className={`filter-group ${isCollapsed ? "hidden" : ""}`}>
        <label>Publication Date Range:</label>
        <div className="publication-dates">
          <input
            className="date-input"
            type="date"
            name="publicationDateStart"
            value={filters.publicationDateStart}
            onChange={handleFilterChange}
          />
          <input
            className="date-input"
            type="date"
            name="publicationDateEnd"
            value={filters.publicationDateEnd}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      <div className={`filter-group ${isCollapsed ? "hidden" : ""}`}>
        <label>Reviews Range:</label>
        <div className="reviews-range">
          <div className="review-input">
            <label>Min:</label>
            <input
              type="range"
              name="minReviews"
              min="0"
              max="5"
              step="0.1"
              value={filters.minReviews}
              onChange={handleFilterChange}
            />
            <span>{filters.minReviews}</span>
          </div>
          <div className="review-input">
            <label>Max:</label>
            <input
              type="range"
              name="maxReviews"
              min="0"
              max="5"
              step="0.1"
              value={filters.maxReviews}
              onChange={handleFilterChange}
            />
            <span>{filters.maxReviews}</span>
          </div>
        </div>
      </div>

      <div className={`clear-filters ${isCollapsed ? "hidden" : ""}`}>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>

      <div>
        <Link style={{ textDecoration: "none" }} to={"/login"}>
          <button
            onClick={handleLogout}
            className={`logout-btn ${isCollapsed ? "hidden" : ""}`}
          >
            {userId ? "Logout" : "Login"}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default SideBar;
