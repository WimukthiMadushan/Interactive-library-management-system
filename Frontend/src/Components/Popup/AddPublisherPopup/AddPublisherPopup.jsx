import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import "./AddPublisherPopup.css";
import NotificationModal from "../../Modals/NotificationModal";

function AddPublisherPopup({ toggleAddPopup, fetchPublishers }) {
  const [newPublisherData, setNewPublisherData] = useState({
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

  const handleAddPublisherDataChange = (e) => {
    const { name, value } = e.target;
    setNewPublisherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const formDataObject = {
      Publisher_First_Name: newPublisherData.Publisher_First_Name,
      Publisher_Last_Name: newPublisherData.Publisher_Last_Name,
      Email: newPublisherData.Email,
      Address: newPublisherData.Address,
      Mobile: newPublisherData.Mobile,
    };
    try {
      await axios.post(`http://localhost:5000/api/publisher`, formDataObject);
      setNewPublisherData({
        Publisher_First_Name: "",
        Publisher_Last_Name: "",
        Email: "",
        Address: "",
        Mobile: "",
      });
      setModalMessage("Publisher Added Successfully.");
      setShowSuccess(true);
      fetchPublishers();
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalMessage("Failed to Add Publisher.");
      setShowError(true);
    }
  };

  return (
    <div className="add-publisher-popup-overlay">
      <div className="add-publisher-popup-container">
        <button className="close-button" onClick={toggleAddPopup}>
          <MdClose size={24} />
        </button>
        <h1>Add Publisher</h1>
        <form className="publisher-form" onSubmit={handleAddSubmit}>
          <div className="multi-fields">
            <input
              onChange={handleAddPublisherDataChange}
              value={newPublisherData.Publisher_First_Name}
              name="Publisher_First_Name"
              type="text"
              placeholder="First Name"
              required
            />
            <input
              onChange={handleAddPublisherDataChange}
              value={newPublisherData.Publisher_Last_Name}
              name="Publisher_Last_Name"
              type="text"
              placeholder="Last Name"
              required
            />
          </div>
          <input
            onChange={handleAddPublisherDataChange}
            value={newPublisherData.Email}
            name="Email"
            type="email"
            placeholder="Email"
            required
          />
          <input
            onChange={handleAddPublisherDataChange}
            value={newPublisherData.Address}
            name="Address"
            type="text"
            placeholder="Address"
            required
          />
          <input
            onChange={handleAddPublisherDataChange}
            value={newPublisherData.Mobile}
            name="Mobile"
            type="tel"
            placeholder="Mobile"
            required
          />
          <button type="submit" className="add-publisher-submit">
            Add Publisher
          </button>
        </form>
      </div>
      <NotificationModal
        show={showSuccess}
        handleClose={handleCloseSuccess}
        title={"sucess"}
        message={modalMessage}
        isSuccess={true}
      />

      <NotificationModal
        show={showError}
        handleClose={handleCloseError}
        title={"failed"}
        message={modalMessage}
        isSuccess={false}
      />
    </div>
  );
}

export default AddPublisherPopup;
