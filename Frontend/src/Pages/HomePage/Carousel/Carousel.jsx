import React from "react";
import Carousel from "react-bootstrap/Carousel";
import First from "./../../../Images/First.jpg";
import Second from "./../../../Images/Second.jpg";
import Third from "./../../../Images/Third.jpg";
import "./Carousel.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../../Hooks/AuthContext.jsx";

function CarouselPage() {
  const { authState } = useAuth();
  const { userId } = authState;

  return (
    <div data-testid="carousel-page">
      <Carousel>
        <Carousel.Item className="carousel-headers" data-testid="carousel-item-1">
          <div className="carousel-image-container" data-testid="carousel-image-container-1">
            <img
              style={{ height: "70vh" }}
              className="carousel-image"
              src={First}
              alt="First slide"
              data-testid="carousel-image-1"
            />
          </div>
          <Carousel.Caption data-testid="carousel-caption-1">
            <h3 style={{ fontSize: "3rem" }} data-testid="carousel-heading-1">Online Library Management</h3>
            <p style={{ marginLeft: "27rem" }} className="carousel-caption-text" data-testid="carousel-text-1">
              Streamline your library with ease. Discover, borrow, and manage <br />
              books all in one place. Empower your reading experience. Seamless <br />
              book discovery and management at your fingertips.
            </p>
            {!userId && (
              <Link to="/login" data-testid="carousel-link-1">
                <button className="carousel-button" data-testid="carousel-button-1">Sign In</button>
              </Link>
            )}
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item data-testid="carousel-item-2">
          <div className="carousel-image-container" data-testid="carousel-image-container-2">
            <img
              style={{ height: "70vh" }}
              className="carousel-image"
              src={Second}
              alt="Second slide"
              data-testid="carousel-image-2"
            />
          </div>
          <Carousel.Caption data-testid="carousel-caption-2">
            <h3 style={{ fontSize: "3rem" }} data-testid="carousel-heading-2">Revolutionize Your Library Experience</h3>
            <p style={{ marginLeft: "20.5rem" }} className="carousel-caption-text" data-testid="carousel-text-2">
              Effortless book management and seamless access to your entire <br />
              collection. Simplify borrowing and returning with our intuitive <br />
              system.
            </p>
            {!userId && (
              <Link to="/register" data-testid="carousel-link-2">
                <button className="carousel-button" data-testid="carousel-button-2">Sign Up</button>
              </Link>
            )}
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item data-testid="carousel-item-3">
          <div className="carousel-image-container" data-testid="carousel-image-container-3">
            <img
              style={{ height: "70vh" }}
              className="carousel-image"
              src={Third}
              alt="Third slide"
              data-testid="carousel-image-3"
            />
          </div>
          <Carousel.Caption data-testid="carousel-caption-3">
            <h3 style={{ fontSize: "3rem" }} data-testid="carousel-heading-3">Unlock the Future of Library Management</h3>
            <p style={{ marginLeft: "17rem" }} className="carousel-caption-text" data-testid="carousel-text-3">
              Experience the ease of digital organization and instant access to <br />
              your library. Enhance your reading journey with our user-friendly <br />
              platform.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselPage;
