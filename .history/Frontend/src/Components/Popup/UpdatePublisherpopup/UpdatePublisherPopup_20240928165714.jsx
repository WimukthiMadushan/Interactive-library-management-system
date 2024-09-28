import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import NotificationModal from "../../Modals/NotificationModal";
import "./UpdatePublisherPopup.css";

function UpdatePublisherPopup({
  toggleUpdatePopup,
  fetchPublishers,
  publisherId,
}) {
  const [updatePublisherData, setUpdatePublisherData] = useState({
    Publisher_ID: "",
    Publisher_First_Name: "",
    Publisher_Last_Name: "",
    Email: "",
    Address: "",
    Mobile: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  useEffect(() => {
    if (publisherId) {
      fetchPublisherById(publisherId);
    }
  }, [publisherId]);

  const handleUpdatePublisherDataChange = (e) => {
    const { name, value } = e.target;
    setUpdatePublisherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/publisher/${updatePublisherData.Publisher_ID}`,
        updatePublisherData
      );
      fetchPublishers();
      setModalMessage("Publisher Updated Successfully.");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error updating publisher:", error);
      setModalMessage("Failed to Update Publisher.");
      setShowError(true);
    }
  };

  const fetchPublisherById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/publisher/${id}`
      );
      setUpdatePublisherData(response.data);
    } catch (error) {
      console.error("Error fetching publisher:", error);
    }
  };

  return (
    <div className="update-publisher-popup-overlay" data-testid="popup-overlay">
      <div className="update-publisher-popup-container">
        <form
          className="publisher-form"
          onSubmit={handleUpdateSubmit}
          data-testid="update-form"
        >
          <h1>Update Publisher</h1>
          <button
            type="button"
            className="close-button"
            onClick={toggleUpdatePopup}
            data-testid="close-button"
          >
            <MdClose />
          </button>
          <div className="multi-fields">
            <input
              onChange={handleUpdatePublisherDataChange}
              value={updatePublisherData.Publisher_First_Name}
              name="Publisher_First_Name"
              type="text"
              placeholder="First Name"
              data-testid="first-name-input"
              required
            />
            <input
              onChange={handleUpdatePublisherDataChange}
              value={updatePublisherData.Publisher_Last_Name}
              name="Publisher_Last_Name"
              type="text"
              placeholder="Last Name"
              data-testid="last-name-input"
              required
            />
          </div>
          <input
            onChange={handleUpdatePublisherDataChange}
            value={updatePublisherData.Email}
            name="Email"
            type="email"
            placeholder="Email"
            data-testid="email-input"
            required
          />
          <input
            onChange={handleUpdatePublisherDataChange}
            value={updatePublisherData.Address}
            name="Address"
            type="text"
            placeholder="Address"
            data-testid="address-input"
            required
          />
          <input
            onChange={handleUpdatePublisherDataChange}
            value={updatePublisherData.Mobile}
            name="Mobile"
            type="tel"
            placeholder="Mobile"
            data-testid="mobile-input"
            required
          />
          <button
            type="submit"
            className="update-publisher-submit"
            data-testid="submit-button"
          >
            Update Publisher
          </button>
        </form>
      </div>

      <NotificationModal
        show={showSuccess}
        handleClose={handleCloseSuccess}
        title={"Success"}
        message={modalMessage}
        isSuccess={true}
        data-testid="success-modal"
      />

      <NotificationModal
        show={showError}
        handleClose={handleCloseError}
        title={"Failed"}
        message={modalMessage}
        isSuccess={false}
        data-testid="error-modal"
      />
    </div>
  );
}

export default UpdatePublisherPopup;
