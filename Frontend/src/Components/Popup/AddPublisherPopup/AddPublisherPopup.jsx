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

  const [modalInfo, setModalInfo] = useState({
    show: false,
    title: "",
    message: "",
    isSuccess: true,
  });

  // const [showSuccess, setShowSuccess] = useState(false);
  // const [showError, setShowError] = useState(false);
  // const [modalMessage, setModalMessage] = useState("");
  // const handleCloseSuccess = () => {
  //   setShowSuccess(false);
  //   toggleAddPopup();
  // };
  // const handleCloseError = () => {
  //   setShowError(false);
  //   toggleAddPopup();
  // };

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
      const response = await axios.post(`http://localhost:5000/api/publisher`, formDataObject);
      
      if (response.status === 201){
        setNewPublisherData({
          Publisher_First_Name: "",
          Publisher_Last_Name: "",
          Email: "",
          Address: "",
          Mobile: "",
        });
        //setModalMessage("Publisher Added Successfully.");
        //setShowSuccess(true);
  
        setModalInfo({
          show: true,
          title: "Success",
          message: "Publisher Added Successfully!",
          isSuccess: true,
        });
  
        fetchPublishers();
      } else {
        setModalInfo({
          show: true,
          title: "Failed!",
          message: "There was an error adding the publisher.",
          isSuccess: false,
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      //setModalMessage("Failed to Add Publisher.");

      setModalInfo({
        show: true,
        title: "Error",
        message: `Failed to add publisher: ${error.message}`,
        isSuccess: false,
      });

      //setShowError(true);
    }
  };

  const handleCloseModal = () => {
    setModalInfo({ ...modalInfo, show: false });
    if (modalInfo.isSuccess) {
      toggleAddPopup();
    }
  };

  return (
    <div className="add-publisher-popup-overlay" data-testid="add-publisher-popup">
      <div className="add-publisher-popup-container">
        <button
          className="close-button"
          onClick={toggleAddPopup}
          data-testid="popup-close-button"
        >
          <MdClose size={24} />
        </button>
        <h1>Add Publisher</h1>
        <form className="publisher-form" onSubmit={handleAddSubmit} data-testid="publisher-form">
          <div className="multi-fields">
            <input
              onChange={handleAddPublisherDataChange}
              value={newPublisherData.Publisher_First_Name}
              name="Publisher_First_Name"
              type="text"
              placeholder="First Name"
              required
              data-testid="first-name-input"
            />
            <input
              onChange={handleAddPublisherDataChange}
              value={newPublisherData.Publisher_Last_Name}
              name="Publisher_Last_Name"
              type="text"
              placeholder="Last Name"
              required
              data-testid="last-name-input"
            />
          </div>
          <input
            onChange={handleAddPublisherDataChange}
            value={newPublisherData.Email}
            name="Email"
            type="email"
            placeholder="Email"
            required
            data-testid="email-input"
          />
          <input
            onChange={handleAddPublisherDataChange}
            value={newPublisherData.Address}
            name="Address"
            type="text"
            placeholder="Address"
            required
            data-testid="address-input"
          />
          <input
            onChange={handleAddPublisherDataChange}
            value={newPublisherData.Mobile}
            name="Mobile"
            type="tel"
            placeholder="Mobile"
            required
            data-testid="mobile-input"
          />
          <button type="submit" className="add-publisher-submit" data-testid="submit-button">
            Add Publisher
          </button>
        </form>
      </div>

      {/* <NotificationModal
        show={showSuccess}
        handleClose={handleCloseSuccess}
        title={"success"}
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
      /> */}

        <NotificationModal
          show={modalInfo.show}
          handleClose={handleCloseModal}
          title={modalInfo.title}
          message={modalInfo.message}
          isSuccess={modalInfo.isSuccess}
        />
    </div>
  );
}

export default AddPublisherPopup;
