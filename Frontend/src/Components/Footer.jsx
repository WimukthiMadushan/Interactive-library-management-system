import React from "react";

import "./../Styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4 className="footer-title">InfoPulse Library</h4>
          <ul className="footer-list">
            <li>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Borrowing Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">Contact</h4>
          <p className="footer-text">
            123 Main St, Anytown USA
            <br />
            Phone: (555) 555-5555
            <br />
            Email: info@infopulselibrary.com
          </p>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">Social</h4>
          <ul className="footer-list">
            <li>
              <a href="#" className="footer-link">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4 className="footer-title">About</h4>
          <p className="footer-text">
            Our InfoPulse Library has been serving the community for over 50
            years. We are dedicated to providing access to knowledge and
            resources for all.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 InfoPulse Library. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
