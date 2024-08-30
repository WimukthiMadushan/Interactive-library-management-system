import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaCalendarAlt } from "react-icons/fa";
import "./ReceptionDashboard.css";

function ReceptionDashboard() {
  return (
    <div className="dashboard-container">
      <h1>Reception Dashboard.</h1>
      <main className="main-content">
        <div className="reception-card-grid">
          <div className="reception-card">
            <div className="reception-card-content">
              <FaBook className="icon" />
              <div className="reception-text-content">
                <h3 className="reception-title">Borrow Books</h3>
                <p className="reception-description">
                  You Can Manage book borrowing and returns.
                </p>
              </div>
              <Link
                to={"/borrowbookmanagement"}
                className="reception-card-link"
              >
                Manage Borrowing
              </Link>
            </div>
          </div>

          <div className="reception-card">
            <div className="reception-card-content">
              <FaCalendarAlt className="icon" />
              <div className="reception-text-content">
                <h3 className="reception-title">Reservation Books</h3>
                <p className="reception-description">
                  Manage book reservations and appointments.
                </p>
              </div>
              <Link
                to={"/reseravtionbookmanagment"}
                className="reception-card-link"
              >
                Manage Reservations
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ReceptionDashboard;
