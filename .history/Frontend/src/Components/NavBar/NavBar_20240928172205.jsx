import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import "./NavBar.css";
import logo from "./../../Images/Logo.png";
import Profile_pic from "./../../Images/Profile_pic.jpg";

function NavBar() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { authState, logout } = useAuth();
  const { userId, role } = authState;

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

  const handleLogout = () => {
    logout();
    setDropdownVisible(false);
    navigate("/");
  };

  // Manage register and login button render
  const [showRegister, setShowRegister] = useState(true);
  const [showLogin, setShowLogin] = useState(true);

  useEffect(() => {
    if (location.pathname === "/") {
      setShowRegister(true);
      setShowLogin(true);
    }
  }, [location]);

  const handleRegisterClick = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  const handleLoginClick = () => {
    setShowLogin(false); 
    setShowRegister(true);
  };

  return (
    <div className="navbar" data-testid="navbar">
      <div className="navbar-left" data-testid="navbar-left">
        <Link to={"/"}>
          <img className="navbar-logo" src={logo} alt="Logo" data-testid="logo" />
        </Link>
        <p>InfoPulse</p>
      </div>

      <div className="navbar-center" data-testid="navbar-center">
        <ul className="nav-links" data-testid="nav-links">
          <li>
            <a href="#home" data-testid="nav-home">Home</a>
          </li>
          <li>
            <a href="#about" data-testid="nav-about">About</a>
          </li>
          <li>
            <a href="#services" data-testid="nav-services">Services</a>
          </li>
          <li>
            <a href="#contact" data-testid="nav-contact">Contact</a>
          </li>
          {role === "Administrator" && (
            <li>
              <Link to={"/adminbuttons"} data-testid="nav-admin">Admin</Link>
            </li>
          )}
          {role === "Receptionist" && (
            <li>
              <Link to={"/receptionbuttons"} data-testid="nav-reception">Reception</Link>
            </li>
          )}
        </ul>
      </div>

      <div className="navbar-right" data-testid="navbar-right">
        {userId ? (
          <div className="dropdown-container" ref={dropdownRef} data-testid="dropdown-container">
            <button className="profile-pic" onClick={toggleDropdown} data-testid="profile-pic">
              <img src={Profile_pic} alt="Profile" />
            </button>
            {dropdownVisible && (
              <div
                className="dropdown-menu"
                style={{ display: "flex", flexDirection: "column" }}
                data-testid="dropdown-menu"
              >
                <Link to={`/profile/${userId}`} className="dropdown-item" data-testid="dropdown-profile">
                  Profile
                </Link>
                <Link to={"/bookdetails"} className="dropdown-item" data-testid="dropdown-bookdetails">
                  Book Details
                </Link>
                <button className="dropdown-item" onClick={handleLogout} data-testid="dropdown-logout">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="login-signup-container" data-testid="login-signup-container">
            {showRegister && (
              <Link to={"/register"} onClick={handleRegisterClick} className="login" data-testid="register-link">
                Register
              </Link>
            )}
            {showLogin && (
              <Link to={"/login"} onClick={handleLoginClick} className="login" data-testid="login-link">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
