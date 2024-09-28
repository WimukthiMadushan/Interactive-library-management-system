import React, { useState,useEffect } from "react";
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
    Address: "",
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

  useEffect(() => {
    if (authorId) {
      fetchAuthorById(authorId);
    }
  }, [authorId]);

  const fetchAuthorById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/author/${id}`
      );
      if (response.data.Address) {
      const [Street = "", City = "", Country = ""] = response.data.Address.split(", ");
      setUpdateData({
        ...response.data,
        Street,
        City,
        Country,
      });
    } else {
      setUpdateData({
        ...response.data,
        Street: "",
        City: "",
        Country: "",
      });
    }
    } catch (error) {
      console.error("Error fetching publisher:", error);
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const combinedAddress = `${updateData.Street}, ${updateData.City}, ${updateData.Country}`;
    const updatedAuthorData = {
    ...updateData,
    Address: combinedAddress
  };
    try {
      const response = await axios.put(
        `http://localhost:5001/api/author/${authorId}`,
        updatedAuthorData
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
    <div className="update-author-overlay" data-testid="update-author-popup">
      <div className="dialog-container">
        <header className="dialog-header">
          <h2
            className="update-author-dialog-title"
            data-testid="dialog-title"
          >
            Update Author
          </h2>
          <button
            className="update-author-close-button"
            onClick={toggleUpdateAuthorPopup}
            data-testid="close-button"
          >
            ×
          </button>
        </header>
        <form
          className="form-grid-update-auth"
          onSubmit={handleUpdateSubmit}
          data-testid="update-author-form"
        >
          <div className="form-grid-two-columns-update-auth">
            <div className="form-field-update-auth">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                type="text"
                onChange={handleUpdateDataChange}
                value={updateData.First_Name}
                name="First_Name"
                placeholder="John"
                className="input-field"
                data-testid="first-name-input"
                required
              />
            </div>
            <div className="form-field-update-auth">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                placeholder="Doe"
                className="input-field"
                type="text"
                value={updateData.Last_Name}
                onChange={handleUpdateDataChange}
                name="Last_Name"
                data-testid="last-name-input"
                required
              />
            </div>
          </div>
          <div className="form-field-update-auth">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="john@example.com"
              className="input-field"
              value={updateData.Email}
              onChange={handleUpdateDataChange}
              name="Email"
              data-testid="email-input"
              required
            />
          </div>
          <div className="form-grid-two-columns-update-auth">
            <div className="form-field-update-auth">
              <label htmlFor="street">Street</label>
              <input
                id="street"
                placeholder="123 Main St"
                className="input-field"
                type="text"
                value={updateData.Street}
                onChange={handleUpdateDataChange}
                name="Street"
                data-testid="street-input"
                required
              />
            </div>
            <div className="form-field-update-auth">
              <label htmlFor="city">City</label>
              <input
                id="city"
                placeholder="New York"
                className="input-field"
                type="text"
                value={updateData.City}
                onChange={handleUpdateDataChange}
                name="City"
                data-testid="city-input"
                required
              />
            </div>
          </div>
          <div className="form-grid-two-columns-update-auth">
            <div className="form-field-update-auth">
              <label htmlFor="country">Country</label>
              <input
                id="country"
                placeholder="United States"
                className="input-field"
                type="text"
                value={updateData.Country}
                onChange={handleUpdateDataChange}
                name="Country"
                data-testid="country-input"
                required
              />
            </div>
            <div className="form-field-update-auth">
              <label htmlFor="nic">NIC Number</label>
              <input
                id="nic"
                placeholder="123-45-6789"
                className="input-field"
                type="text"
                value={updateData.NIC}
                onChange={handleUpdateDataChange}
                name="NIC"
                data-testid="nic-input"
                required
              />
            </div>
          </div>
          <div className="form-field-update-auth">
            <label htmlFor="mobile">Mobile Number</label>
            <input
              id="mobile"
              placeholder="+1 (555) 555-5555"
              className="input-field"
              type="text"
              value={updateData.Mobile}
              onChange={handleUpdateDataChange}
              name="Mobile"
              data-testid="mobile-input"
              required
            />
          </div>
          <footer className="dialog-footer-update-auth">
            <button
              type="submit"
              className="button button-primary"
              data-testid="submit-button"
            >
              Update
            </button>
            <button
              type="button"
              className="button button-cancel"
              onClick={toggleUpdateAuthorPopup}
              data-testid="cancel-button"
            >
              Cancel
            </button>
          </footer>
        </form>
        {modalInfo.show && (<NotificationModal
          show={modalInfo.show}
          handleClose={handleCloseModal}
          title={modalInfo.title}
          message={modalInfo.message}
          isSuccess={modalInfo.isSuccess}
        />)}
      </div>
    </div>
  );
}

export default UpdateAuthorPopup;
