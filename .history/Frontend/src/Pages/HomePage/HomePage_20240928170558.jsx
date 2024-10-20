import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AboutUs from "./AboutUs/AboutUs";
import Carousel from "./Carousel/Carousel";
import Services from "./Services/Services";
import OurTeam from "./OurTeam/OurTeam";

function HomePage() {
  return (
    <div className="home-container">
      <Carousel />
      <Header />
      <div id="about">
        <AboutUs />
      </div>
      <div id="services">
        <Services />
      </div>
      <div id="contact">
        <OurTeam />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;