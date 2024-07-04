import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGooglePlusG,
  FaYoutube,
} from "react-icons/fa";
import "./../Styles/Footer.css";

function Footer() {
  return (
    <div>
      <footer>
        <div className="footerContainer">
          <div className="socialIcons">
            <a href="#">
              <FaFacebook />
            </a>
            <a href="#">
              <FaInstagram />
            </a>
            <a href="#">
              <FaTwitter />
            </a>
            <a href="#">
              <FaGooglePlusG />
            </a>
            <a href="#">
              <FaYoutube />
            </a>
          </div>
          <div className="footerNav">
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">News</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footerBottom">
          <p>
            Copyright &copy;2024; Designed by{" "}
            <span className="designer">CSE|UOM</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
