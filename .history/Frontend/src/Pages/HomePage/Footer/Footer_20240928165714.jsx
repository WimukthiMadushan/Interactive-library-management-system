import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer" data-testid="footer">
      <div className="footer-container" data-testid="footer-container">
        <div className="footer-section" data-testid="footer-section-info">
          <h4 className="footer-title" data-testid="footer-title-info">
            InfoPulse Library
          </h4>
          <ul className="footer-list" data-testid="footer-list-info">
            <li>
              <a href="#" className="footer-link" data-testid="footer-link-privacy">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="footer-link" data-testid="footer-link-terms">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="footer-link" data-testid="footer-link-borrowing">
                Borrowing Policy
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section" data-testid="footer-section-contact">
          <h4 className="footer-title" data-testid="footer-title-contact">
            Contact
          </h4>
          <p className="footer-text" data-testid="footer-text-contact">
            123 Main St, Anytown USA
            <br />
            Phone: (555) 555-5555
            <br />
            Email: info@infopulselibrary.com
          </p>
        </div>
        <div className="footer-section" data-testid="footer-section-social">
          <h4 className="footer-title" data-testid="footer-title-social">
            Social
          </h4>
          <ul className="footer-list" data-testid="footer-list-social">
            <li>
              <a href="#" className="footer-link" data-testid="footer-link-facebook">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" className="footer-link" data-testid="footer-link-twitter">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" className="footer-link" data-testid="footer-link-instagram">
                Instagram
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-section" data-testid="footer-section-about">
          <h4 className="footer-title" data-testid="footer-title-about">
            About
          </h4>
          <p className="footer-text" data-testid="footer-text-about">
            Our InfoPulse Library has been serving the community for over 50
            years. We are dedicated to providing access to knowledge and
            resources for all.
          </p>
        </div>
      </div>
      <div className="footer-bottom" data-testid="footer-bottom">
        &copy; 2024 InfoPulse Library. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
