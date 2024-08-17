import React from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import AboutUs from "../Components/AboutUs";
import Carousel from "../Components/Carousel";
import Services from "../Components/Services";
import OurTeam from "../Components/OurTeam";

function HomePage() {
  return (
    <div className="home-container">
      <Carousel />
      <Header />
      <AboutUs />
      <Services />
      <OurTeam />
      <Footer />
    </div>
  );
}

export default HomePage;
