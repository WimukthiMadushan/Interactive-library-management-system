import React from "react";
import "./../Styles/HomePage.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import AboutUs from "../Components/AboutUs";
import Carousel from "../Components/Carousel";

function HomePage() {
  return (
    <div className="home-container">
      <Carousel />
      <Header />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default HomePage;
