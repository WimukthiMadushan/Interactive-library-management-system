import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import "./AddStaffPopup.css";
import NotificationModal from "../../Modals/NotificationModal";

const AddStaffPopup = ({ toggleAddPopup, fetchStaffs }) => {
    const [newStaffData, setNewStaffData] = useState({
        Staff_First_Name: "",
        Staff_Last_Name: "",
        Email: "",
        Address: "",
        Mobile: "",
      });
    
      const [showSuccess, setShowSuccess] = useState(false);
      const [showError, setShowError] = useState(false);
      const [modalMessage, setModalMessage] = useState("");
      const handleCloseSuccess = () => setShowSuccess(false);
      const handleCloseError = () => setShowError(false);
    
      const handleAddStaffDataChange = (e) => {
        const { name, value } = e.target;
        setNewStaffData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleAddSubmit = async (event) => {
        event.preventDefault();
        const formDataObject = {
          Staff_First_Name: newStaffData.Staff_First_Name,
          Staff_Last_Name: newStaffData.Staff_Last_Name,
          Email: newStaffData.Email,
          Address: newStaffData.Address,
          Mobile: newStaffData.Mobile,
        };
        try {
          await axios.post(`http://localhost:5000/api/staff`, formDataObject);
          setNewStaffData({
            Staff_First_Name: "",
            Staff_Last_Name: "",
            Email: "",
            Address: "",
            Mobile: "",
          });
          setModalMessage("Staff Added Successfully.");
          setShowSuccess(true);
          fetchStaffs();
        } catch (error) {
          console.error("Error submitting form:", error);
          setModalMessage("Failed to Add Staff.");
          setShowError(true);
        }
      };
    
      return (
        <div className="add-staff-popup-overlay">
          <div className="add-staff-popup-container">
            <button className="close-button" onClick={toggleAddPopup}>
              <MdClose size={24} />
            </button>
            <h1>Add Staff</h1>
            <form className="staff-form" onSubmit={handleAddSubmit}>
              <div className="multi-fields">
                <input
                  onChange={handleAddStaffDataChange}
                  value={newStaffData.Staff_First_Name}
                  name="Staff_First_Name"
                  type="text"
                  placeholder="First Name"
                  required
                />
                <input
                  onChange={handleAddStaffDataChange}
                  value={newStaffData.Staff_Last_Name}
                  name="Staff_Last_Name"
                  type="text"
                  placeholder="Last Name"
                  required
                />
              </div>
              <input
                onChange={handleAddStaffDataChange}
                value={newStaffData.Email}
                name="Email"
                type="email"
                placeholder="Email"
                required
              />
              <input
                onChange={handleAddStaffDataChange}
                value={newStaffData.Address}
                name="Address"
                type="text"
                placeholder="Address"
                required
              />
              <input
                onChange={handleAddStaffDataChange}
                value={newStaffData.Mobile}
                name="Mobile"
                type="tel"
                placeholder="Mobile"
                required
              />
              <button type="submit" className="add-staff-submit">
                Add Staff
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
export default AddStaffPopup
