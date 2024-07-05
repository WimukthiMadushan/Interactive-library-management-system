import React from "react";
import Carousel from "react-bootstrap/Carousel";
import First from "./../Images/First.jpg";
import Second from "./../Images/Second.jpg";
import Third from "./../Images/Third.jpg";
import "./../Styles/Carousel.css";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

function CarouselPage() {
  return (
    <>
      <div>
        <Carousel>
          <Carousel.Item className="carousel-headers">
            <div className="carousel-image-container">
              <img
                style={{ height: "70vh" }}
                className="carousel-image"
                src={First}
                alt="First slide"
              />
            </div>
            <Carousel.Caption>
              <h3 style={{ fontSize: "3rem" }}>Online Library Management</h3>
              <p
                style={{
                  position: "relative",
                  textAlign: "left",
                  left: "27rem",
                }}
              >
                Streamline your library with ease. Discover, borrow, and manage{" "}
                <br />
                books all in one place.Empower your reading experience.
                <br /> Seamless book discovery and management at your
                fingertips.
              </p>
              <Link to={"/register"}>
                <button className="carousel-button">Sign Up</button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image-container">
              <img
                style={{ height: "70vh" }}
                className="carousel-image"
                src={Second}
                alt="Second slide"
              />
            </div>
            <Carousel.Caption>
              <h3 style={{ fontSize: "3rem" }}>
                Revolutionize Your Library Experience
              </h3>
              <p
                style={{
                  position: "relative",
                  textAlign: "left",
                  left: "20.5rem",
                }}
              >
                Effortless book management and seamless access to your entire{" "}
                <br />
                collection. Simplify borrowing and returning with our intuitive
                system.
              </p>
              <Link to={"/login"}>
                <button className="carousel-button">Sign In</button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <div className="carousel-image-container">
              <img
                style={{ height: "70vh" }}
                className="carousel-image"
                src={Third}
                alt="Third slide"
              />
            </div>
            <Carousel.Caption>
              <h3 style={{ fontSize: "3rem" }}>
                Unlock the Future of Library Management
              </h3>
              <p
                style={{
                  position: "relative",
                  textAlign: "left",
                  left: "17.5rem",
                }}
              >
                Experience the ease of digital organization and instant access{" "}
                <br />
                to your library. Enhance your reading journey with our
                user-friendly platform.
              </p>
              <Link to={"/adminlogin"}>
                <button className="carousel-button">Admin Login</button>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </>
  );
}

export default CarouselPage;
