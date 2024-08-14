import React, { useState } from "react";
import "./../Styles/Modal.css";

function AuthorModal({ onClose, onSave }) {
  // State for new author details
  const [authorDetails, setAuthorDetails] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Address: "",
    NIC: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAuthorDetails({ ...authorDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(authorDetails);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Author</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            First Name:
            <input
              type="text"
              name="First_Name"
              value={authorDetails.First_Name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="Last_Name"
              value={authorDetails.Last_Name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="Email"
              value={authorDetails.Email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="Address"
              value={authorDetails.Address}
              onChange={handleInputChange}
            />
          </label>
          <label>
            NIC:
            <input
              type="text"
              name="NIC"
              value={authorDetails.NIC}
              onChange={handleInputChange}
            />
          </label>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="modal-button">
              Cancel
            </button>
            <button type="submit" className="modal-button modal-save-button">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AuthorModal;
