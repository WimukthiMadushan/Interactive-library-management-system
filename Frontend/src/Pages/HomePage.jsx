import React from "react";
import "./../Styles/HomePage.css";
import Header from "../Components/Header";

import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";

function HomePage() {
  return (
    <div className="home-container">
      <NavBar />
      <Header />
    </div>
  );
}

export default HomePage;
