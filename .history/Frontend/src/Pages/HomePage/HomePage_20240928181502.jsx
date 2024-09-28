import React, { useEffect } from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import AboutUs from "./AboutUs/AboutUs";
import Carousel from "./Carousel/Carousel";
import Services from "./Services/Services";
import OurTeam from "./OurTeam/OurTeam";

function HomePage() {
  useEffect(() => {
    // Scroll to the section based on the hash
    if (window.location.hash) {
      const sectionId = window.location.hash.substring(1); // Remove the '#' from the hash
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

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
