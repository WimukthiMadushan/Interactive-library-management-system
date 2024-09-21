import React from "react";
import "./AboutUs.css";
import Image_01 from "./../../../Images/bank.png";
import Image_02 from "./../../../Images/Search.png";
import Image_03 from "./../../../Images/Danger.png";

function AboutUs() {
  return (
    <div className="aboutUs-container" data-testid="about-us-container">
      <div className="first" data-testid="about-us-first-section">
        <h1 data-testid="about-us-heading">
          Improve the management system <br />
          of your library
        </h1>
        <p data-testid="about-us-description">
          Libreva stores every information electronically and in an organized
          and systematic way which leads to effective results. The website is
          designed in such a way that it modernizes the library system and helps
          the users to make the best use of the Library Automation System.
        </p>
      </div>
      <div className="second" data-testid="about-us-inventory-section">
        <img src={Image_01} alt="Digital Book Inventory" data-testid="about-us-image-1" />
        <h1 data-testid="about-us-inventory-heading">Digital Book Inventory</h1>
        <p data-testid="about-us-inventory-description">
          An inventory is the one method that libraries and archives use to
          determine whether some items in their collection are in need of
          preservation or conservation activities.
        </p>
      </div>
      <div className="third" data-testid="about-us-search-section">
        <img src={Image_02} alt="Search Books" data-testid="about-us-image-2" />
        <h1 data-testid="about-us-search-heading">Search Books</h1>
        <p data-testid="about-us-search-description">
          Search the world's most comprehensive index of full-text books. It is
          a selective website featuring some of the best books published in the
          past 15 years.
        </p>
      </div>
      <div className="fourth" data-testid="about-us-defaulters-section">
        <img src={Image_03} alt="Defaulters List" data-testid="about-us-image-3" />
        <h1 data-testid="about-us-defaulters-heading">Defaulters List</h1>
        <p data-testid="about-us-defaulters-description">
          In this segment you can search the list of all the issuers whether
          they are students or staff members who have not returned their book
          even after the due date.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
