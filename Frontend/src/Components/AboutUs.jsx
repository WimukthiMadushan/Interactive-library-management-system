import React from "react";
import "./../Styles/AboutUs.css";
import Image_01 from "./../Images/bank.png";
import Image_02 from "./../Images/Search.png";
import Image_03 from "./../Images/Danger.png";

function AboutUs() {
  return (
    <div className="aboutUs-container">
      <div className="first">
        <h1>
          Improve the management system <br />
          of your library
        </h1>
        <p>
          Libreva stores every information electronically and in an organized
          and systematic way which leads to effective results. The website is
          designed in such a way that it modernizes the library system and helps
          the users to make the best use of the Library Automation System.
        </p>
      </div>
      <div className="second">
        <img src={Image_01} alt="Digital Book Inventory" />
        <h1>Digital Book Inventory</h1>
        <p>
          An inventory is the one method that libraries and archives use to
          determine whether some items in their collection are in need of
          preservation or conservation activities.
        </p>
      </div>
      <div className="third">
        <img src={Image_02} alt="Search Books" />
        <h1>Search Books</h1>
        <p>
          Search the world's most comprehensive index of full-text books. It is
          a selective website featuring some of the best books published in the
          past 15 years.
        </p>
      </div>
      <div className="fourth">
        <img src={Image_03} alt="Defaulters List" />
        <h1>Defaulters List</h1>
        <p>
          In this segment you can search the list of all the issuers whether
          they are students or staff members who have not returned their book
          even after the due date.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
