import React, { useState } from "react";
import "./../Styles/Modal.css";

function PublisherModal({ onClose, onSave }) {
  // State for new publisher details
  const [publisherDetails, setPublisherDetails] = useState({
    Publisher_First_Name: "",
    Publisher_Last_Name: "",
    Email: "",
    Address: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPublisherDetails({ ...publisherDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(publisherDetails);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Add New Publisher</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <label>
            First Name:
            <input
              type="text"
              name="Publisher_First_Name"
              value={publisherDetails.Publisher_First_Name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              name="Publisher_Last_Name"
              value={publisherDetails.Publisher_Last_Name}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="Email"
              value={publisherDetails.Email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Address:
            <input
              type="text"
              name="Address"
              value={publisherDetails.Address}
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

export default PublisherModal;
