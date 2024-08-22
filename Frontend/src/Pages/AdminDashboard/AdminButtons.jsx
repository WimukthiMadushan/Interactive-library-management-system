import React from "react";
import { Link } from "react-router-dom";
import { FaBook, FaUser, FaUsers, FaBuilding } from "react-icons/fa";
import "./AdminButtons.css";

function AdminButtons() {
  return (
    <div className="outer-container">
      <div className="dashboard-container">
        <h1>Admin Dashboard.</h1>
        <div className="admin-cards-grid">
          <div className="admin-card">
            <div className="admin-card-content">
              <FaUser className="icon" />
              <h3>Author Management</h3>
              <p>Manage authors, their profiles, and published works.</p>
              <Link to={"/authormanagement"} className="admin-card-link">
                Manage Authors
              </Link>
            </div>
          </div>
          <div className="admin-card">
            <div className="admin-card-content">
              <FaBook className="icon" />
              <h3>Book Management</h3>
              <p>Manage books, their details, and publishing information.</p>
              <Link to={"/bookmanagement"} className="admin-card-link">
                Manage Books
              </Link>
            </div>
          </div>
          <div className="admin-card">
            <div className="admin-card-content">
              <FaUsers className="icon" />
              <h3>User Management</h3>
              <p>Manage user accounts, roles, and permissions.</p>
              <Link to={"/usermanagement"} className="admin-card-link">
                Manage Users
              </Link>
            </div>
          </div>
          <div className="admin-card">
            <div className="admin-card-content">
              <FaBuilding className="icon" />
              <h3>Publisher Management</h3>
              <p>Manage publishers, their details, and published books.</p>
              <Link to={"/publishermanagement"} className="admin-card-link">
                Manage Publishers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminButtons;
