import React from "react";
import { useState } from "react";
import NotificationModal from "./../../Modals/NotificationModal";
import axios from "axios";
import "./AddAuthorPopup.css";

function AddAuthorPopup({ toggleAddAuthorPopup, fetchAuthors }) {
  const [newData, setNewData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Street: "",
    City: "",
    Country: "",
    NIC: "",
    Mobile: "",
  });

  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    message: "",
    isSuccess: true,
  });

  const handleNewDataChange = (event) => {
    const { name, value } = event.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5001/api/author/",
        newData
      );
      if (response.status === 201) {
        setModalInfo({
          show: true,
          title: "Success",
          message: "Author added successfully!",
          isSuccess: true,
        });
        fetchAuthors();
        setNewData({
          First_Name: "",
          Last_Name: "",
          Email: "",
          Street: "",
          City: "",
          Country: "",
          NIC: "",
          Mobile: "",
        });
      } else {
        setModalInfo({
          show: true,
          title: "Error",
          message: "There was an error adding the author.",
          isSuccess: false,
        });
      }
    } catch (error) {
      setModalInfo({
        show: true,
        title: "Error",
        message: `Failed to add author: ${error.message}`,
        isSuccess: false,
      });
    }
  };

  const handleCloseModal = () => {
    setModalInfo({ ...modalInfo, show: false });
    if (modalInfo.isSuccess) {
      toggleAddAuthorPopup();
    }
  };

  return (
    <div className="overlay">
      <div className="dialog-container">
        <header className="dialog-header">
          <h2 className="dialog-title">Add New Author</h2>
          <p className="dialog-description">
            Fill out the form below to add a new author to your database.
          </p>
          <button
            className="add-author-close-button"
            onClick={() => {
              toggleAddAuthorPopup();
            }}
          >
            ×
          </button>
        </header>
        <form className="form-grid" onSubmit={handleAddSubmit}>
          <div className="form-grid-two-columns">
            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                onChange={handleNewDataChange}
                value={newData.First_Name}
                name="First_Name"
                placeholder="John"
                className="input-field"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                placeholder="Doe"
                className="input-field"
                type="text"
                value={newData.Last_Name}
                onChange={handleNewDataChange}
                name="Last_Name"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="input-field"
              value={newData.Email}
              onChange={handleNewDataChange}
              name="Email"
              required
            />
          </div>
          <div className="form-grid-two-columns">
            <div className="form-field">
              <label htmlFor="street">Street</label>
              <input
                id="street"
                placeholder="123 Main St"
                className="input-field"
                type="text"
                value={newData.Street}
                onChange={handleNewDataChange}
                name="Street"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="city">City</label>
              <input
                id="city"
                placeholder="New York"
                className="input-field"
                type="text"
                value={newData.City}
                onChange={handleNewDataChange}
                name="City"
                required
              />
            </div>
          </div>
          <div className="form-grid-two-columns">
            <div className="form-field">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                placeholder="United States"
                className="input-field"
                type="text"
                value={newData.Country}
                onChange={handleNewDataChange}
                name="Country"
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="nic">NIC Number</label>
              <input
                id="nic"
                placeholder="123-45-6789"
                className="input-field"
                type="text"
                value={newData.NIC}
                onChange={handleNewDataChange}
                name="NIC"
                required
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              placeholder="+1 (555) 555-5555"
              className="input-field"
              type="text"
              value={newData.Mobile}
              onChange={handleNewDataChange}
              name="Mobile"
              required
            />
          </div>
          <footer className="dialog-footer">
            <button
              type="submit"
              className="button button-primary"
              onClick={handleAddSubmit}
            >
              Save
            </button>
            <button
              type="button"
              className="button button-cancel"
              onClick={() => toggleAddAuthorPopup()}
            >
              Cancel
            </button>
          </footer>
        </form>
        <NotificationModal
          show={modalInfo.show}
          handleClose={handleCloseModal}
          title={modalInfo.title}
          message={modalInfo.message}
          isSuccess={modalInfo.isSuccess}
        />
      </div>
    </div>
  );
}

export default AddAuthorPopup;
