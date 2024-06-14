import React from "react";
import { Link } from "react-router-dom";
import { TiArrowRightThick } from "react-icons/ti";
import "./../Styles/Header.css";
import Header_image from "./../Images/Header_Image.jpg";

function Header() {
  return (
    <div className="header-container">
      <div className="header-left">
        <div className="header-text">
          <h1>
            Power Books <br />
            to Exceed <br />
            Your Mental <br />
            Limits!
          </h1>
          <div className="header-arrow">
            <Link to={"/searchbooks"} className="arrow-link">
              <TiArrowRightThick className="animated-arrow" color="#383838" />
            </Link>
          </div>

          <h5>
            Being involved in education dedicatedly <br />
            is a good meditation for years.
          </h5>
        </div>
      </div>
      <div className="header-right">
        <img className="header-image" src={Header_image} alt="" />
      </div>
    </div>
  );
}

export default Header;
