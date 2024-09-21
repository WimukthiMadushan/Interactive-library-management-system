import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaCalendarAlt } from "react-icons/fa";
import "./ReceptionDashboard.css";

function ReceptionDashboard() {
  return (
    <div className="dashboard-container" data-testid="dashboard-container">
      <h1 data-testid="dashboard-title">Reception Dashboard.</h1>
      <main className="main-content">
        <div className="reception-card-grid" data-testid="card-grid">
          <div className="reception-card" data-testid="borrow-card">
            <div className="reception-card-content">
              <FaBook className="icon" data-testid="borrow-icon" />
              <div className="reception-text-content">
                <h3 className="reception-title" data-testid="borrow-title">
                  Borrow Books
                </h3>
                <p
                  className="reception-description"
                  data-testid="borrow-description"
                >
                  You Can Manage book borrowing and returns.
                </p>
              </div>
              <Link
                to={"/borrowbookmanagement"}
                className="reception-card-link"
                data-testid="borrow-link"
              >
                Manage Borrowing
              </Link>
            </div>
          </div>

          <div className="reception-card" data-testid="reservation-card">
            <div className="reception-card-content">
              <FaCalendarAlt className="icon" data-testid="reservation-icon" />
              <div className="reception-text-content">
                <h3 className="reception-title" data-testid="reservation-title">
                  Reservation Books
                </h3>
                <p
                  className="reception-description"
                  data-testid="reservation-description"
                >
                  Manage book reservations and appointments.
                </p>
              </div>
              <Link
                to={"/reseravtionbookmanagment"}
                className="reception-card-link"
                data-testid="reservation-link"
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
