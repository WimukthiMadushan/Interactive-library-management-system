import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./../Hooks/AuthContext.jsx";
import "./../Styles/NavBar.css";
import logo from "./../Images/logo.png";
import Profile_pic from "./../Images/Profile_pic.jpg";

function NavBar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  console.log(dropdownVisible);
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const { authState, logout } = useAuth();
  const { userId } = authState;

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
  };

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to={"/"}>
          <img className="navbar-logo" src={logo} alt="Logo" />
        </Link>
        <p>InfoPulse</p>
      </div>

      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        {userId ? (
          <div className="dropdown-container" ref={dropdownRef}>
            <button className="profile-pic" onClick={toggleDropdown}>
              <img src={Profile_pic} alt="Profile" />
            </button>
            {dropdownVisible && (
              <div
                className="dropdown-menu"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <Link to={"/profile"} className="dropdown-item">
                  Profile
                </Link>
                <button className="dropdown-item" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="login-signup-container">
            <Link to={"/register"} className="login">
              Register
            </Link>
            <Link to={"/login"} className="login">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
