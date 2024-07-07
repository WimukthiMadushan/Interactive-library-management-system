import React from "react";
import "./../Styles/HomePage.css";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import AboutUs from "../Components/AboutUs";
import Carousel from "../Components/Carousel";

function HomePage() {
  return (
    <div className="home-container">
      <NavBar />
      <Carousel />
      <Header />
      <AboutUs />
      <Footer />
      {/*
      <div
        style={{
          backgroundColor: "#457B9D",
          color: "white",
          textAlign: "center",
          margin: 0,
        }}
      >
      
        <p>Admin Login</p>
      </div>
      */}
    </div>
  );
}

export default HomePage;
