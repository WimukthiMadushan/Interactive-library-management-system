import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import axios from "axios";
import "./AddStaffPopup.css";
import NotificationModal from "../../Modals/NotificationModal";

const AddStaffPopup = ({ toggleAddPopup, fetchStaffs }) => {
    const [user, setUser] = useState([]);
    const [newStaffData, setNewStaffData] = useState({
        User_ID: "",
        Role: "",
      });
    
      const [showSuccess, setShowSuccess] = useState(false);
      const [showError, setShowError] = useState(false);
      const [modalMessage, setModalMessage] = useState("");
      const handleCloseSuccess = () => setShowSuccess(false);
      const handleCloseError = () => setShowError(false);
      const [searchId, setSearchId] = useState("");
    
      const handleAddStaffDataChange = (e) => {
        const { name, value } = e.target;
        setNewStaffData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const fetchUser = async (searchId) => {
        try {
          const response = await axios.get(`http://localhost:5001/api/user/${searchId}`);
          if(response.data.message === "User retrieved successfully"){
            setUser(response.data);
          }else{
            console.log("User not found");
          }
          
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
    
      const handleAddSubmit = async (event) => {
        event.preventDefault();
        const formDataObject = {
          User_ID: searchId,
          Role: newStaffData.Role,
        };
        try { 
          const response = await axios.post(`http://localhost:5001/api/user/addstaff`, formDataObject);
          setNewStaffData({
            User_ID: "",
            Role: "",
          });
          setUser([]);
          setSearchId("");
          setModalMessage("Staff Added Successfully.");
          setShowSuccess(true);
        } catch (error) {
          console.error("Error submitting form:", error);
          setModalMessage("Failed to Add Staff.");
          setShowError(true);
        }
      };
    
      return (
        <div className="add-staff-popup-overlay" data-testid="add-staff-popup">
          <div className="add-staff-popup-container">
            <button className="close-button" onClick={toggleAddPopup} data-testid="close-button">
              <MdClose size={24} />
            </button>
            <h1>Add Staff</h1>
            <form className="staff-form" onSubmit={handleAddSubmit} data-testid="staff-form">

              <div className="add-user">
                <input
                  onChange={(e) => setSearchId(e.target.value)}
                  value={searchId}
                  name="User_ID"
                  type="text"
                  placeholder="Enter user ID"
                  required
                  data-testid="user-id-input"
                />
                <button
                  type="button"
                  className="add-user-submit"
                  onClick={() => fetchUser(searchId)}
                  data-testid="find-user-button"
                >
                  Find user
                </button>
              </div>
              
              <div className="add-staff-multi-fields">
                <input
                  
                  value={user.First_Name || ""}
                  name="Staff_First_Name"
                  type="text"
                  placeholder="First Name"
                  readOnly
                  data-testid="first-name-input"
                />
                <input
                  
                  value={user.Last_Name || ""}
                  name="Staff_Last_Name"
                  type="text"
                  placeholder="Last Name"
                  readOnly
                  data-testid="last-name-input"
                />
              </div>
              <input
                
                value={user.Email || ""}
                name="Email"
                type="email"
                placeholder="Email"
                readOnly
                data-testid="email-input"
              />

              <select className='role-select'
                value={newStaffData.Role}
                onChange={handleAddStaffDataChange}
                name="Role"
                required
                data-testid="role-select"
              >
                <option className='role-select-option' value="" disabled>Select Role</option>
                <option value="Administrator">Administrator</option>
                <option value="Receptionist">Receptionist</option>
              </select>
              
              <button type="submit" className="add-staff-submit" data-testid="submit-button">
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
export default AddStaffPopup
