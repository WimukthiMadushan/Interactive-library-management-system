import React, { useState } from "react";
import axios from "axios";
import NotificationModal from "./../../Modals/NotificationModal";
import "./UpdataAuthorPopup.css";

function UpdateAuthorPopup({
  toggleUpdateAuthorPopup,
  fetchAuthors,
  authorId,
}) {
  const [updateData, setUpdateData] = useState({
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

  const handleUpdateDataChange = (event) => {
    const { name, value } = event.target;
    setUpdateData({
      ...updateData,
      [name]: value,
    });
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    //console.log(authorId);
    try {
      const response = await axios.put(
        `http://localhost:5001/api/author/${authorId}`,
        updateData
      );
      if (response.status === 200) {
        setModalInfo({
          show: true,
          title: "Success",
          message: "Author updated successfully!",
          isSuccess: true,
        });
        fetchAuthors();
      } else {
        setModalInfo({
          show: true,
          title: "Error",
          message: "There was an error updating the author.",
          isSuccess: false,
        });
      }
    } catch (error) {
      setModalInfo({
        show: true,
        title: "Error",
        message: `Failed to update author`,
        isSuccess: false,
      });
    }
  };

  const handleCloseModal = () => {
    setModalInfo({ ...modalInfo, show: false });
    if (modalInfo.isSuccess) {
      toggleUpdateAuthorPopup();
    }
  };

  return (
    <div className="overlay">
      <div className="dialog-container">
        <header className="dialog-header">
          <h2 className="dialog-title">Update Author</h2>
          <button
            className="update-author-close-button"
            onClick={toggleUpdateAuthorPopup}
          >
            ×
          </button>
        </header>
        <form className="form-grid" onSubmit={handleUpdateSubmit}>
          <div className="form-grid-two-columns">
            <div className="form-field">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                onChange={handleUpdateDataChange}
                value={updateData.First_Name}
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
                value={updateData.Last_Name}
                onChange={handleUpdateDataChange}
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
              value={updateData.Email}
              onChange={handleUpdateDataChange}
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
                value={updateData.Street}
                onChange={handleUpdateDataChange}
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
                value={updateData.City}
                onChange={handleUpdateDataChange}
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
                value={updateData.Country}
                onChange={handleUpdateDataChange}
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
                value={updateData.NIC}
                onChange={handleUpdateDataChange}
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
              value={updateData.Mobile}
              onChange={handleUpdateDataChange}
              name="Mobile"
              required
            />
          </div>
          <footer className="dialog-footer">
            <button type="submit" className="button button-primary">
              Update
            </button>
            <button
              type="button"
              className="button button-cancel"
              onClick={toggleUpdateAuthorPopup}
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

export default UpdateAuthorPopup;
