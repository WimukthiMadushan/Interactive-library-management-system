import React from "react";
import ServiceCard from "./ServiceCard/ServiceCard";
import { FaSearch, FaBook, FaCalendarAlt, FaSyncAlt } from "react-icons/fa";
import "./Services.css";

export default function Services() {
  return (
    <section className="services-section">
      <div className="services-container">
        <div className="services-header">
          <h2 className="services-title">Our Services</h2>
          <p className="services-description">
            Discover our comprehensive library services, designed to help you
            effortlessly find, borrow, and manage the books you love. From our
            extensive collection to convenient reservation and update features,
            we're here to enhance your reading experience.
          </p>
        </div>
        <div className="services-grid">
          <ServiceCard
            Icon={<FaSearch className="icon" />}
            title="Search Books"
            description="Easily navigate our extensive collection to find the perfect books for your reading pleasure."
          />
          <ServiceCard
            Icon={<FaBook className="icon" />}
            title="Borrow Books"
            description="Enjoy the convenience of borrowing books from our library and reading them at your own pace."
          />
          <ServiceCard
            Icon={<FaCalendarAlt className="icon" />}
            title="Reserve Books"
            description="Secure your access to the books you need by reserving them in advance, ensuring they're available when you're ready to read."
          />
          <ServiceCard
            Icon={<FaSyncAlt className="icon" />}
            title="Update Books Available"
            description="Stay informed about the latest additions to our library's collection, so you can discover new and exciting reads."
          />
        </div>
      </div>
    </section>
  );
}
