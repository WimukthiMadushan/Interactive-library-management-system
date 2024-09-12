import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import './UpdateStaffPopup.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const UpdateStaffPopup = ({togglePopup,data}) => {

    const [staffData, setStaffData] = useState(data);

    const handleUpdateDataChange = (event) => {
        const { name, value } = event.target;
        setStaffData({
          ...staffData,
          [name]: value,
        });
      };
      
    const handleUpdateStaff = async (e) => {
    e.preventDefault();
    const data = staffData;
    const id = staffData.Staff_ID;

    try {
        const response = await axios.put(`http://localhost:5000/api/user/staff/${id}`, data);

        if(response.data.success){
        togglePopup();
        fetchStaff();
        toast.success("Staff member updated successfully.");
        } else {
        toast.error("Failed to update staff member. Please try again.");
        }
    } catch (error) {
        console.error("Error updating staff member:", error);
    }
    };


  return (
    <div className="update-staff-popup-overlay">
        <div className="update-staff-popup" style={{ width: "700px", overflow: "visible" }}>
        <form onSubmit={handleUpdateStaff}>
            <div className="update-staff-container" style={{ width: "640px" }}>
            <h1>Update Staff Member</h1>
            <FontAwesomeIcon className="update-staff-close-button" size="lg" icon={faXmark} onClick={togglePopup} />
            <div className="update-staff-multi-fields">
                <input
                type="text"
                value={staffData.User_ID}
                onChange={handleUpdateDataChange}
                name="User_ID"
                placeholder="User ID"
                required
                readOnly
                />
                <input
                type="text"
                value={staffData.Staff_ID}
                onChange={handleUpdateDataChange}
                name="Staff_ID"
                placeholder="Staff ID"
                required
                readOnly
                />
            </div>
            <div className="update-staff-multi-fields">
                <input
                type="text"
                value={staffData.First_Name}
                onChange={handleUpdateDataChange}
                name="First_Name"
                placeholder="First Name"
                required
                />
                <input
                type="text"
                value={staffData.Last_Name}
                onChange={handleUpdateDataChange}
                name="Last_Name"
                placeholder="Last Name"
                required
                />
            </div>
            <select className='role-select'
                value={staffData.Role}
                onChange={handleUpdateDataChange}
                name="Role"
                required
            >
                <option className='role-select-option' value="" disabled>Select Role</option>
                <option value="Administrator">Administrator</option>
                <option value="Receptionist">Receptionist</option>
            </select>
            <button type="submit" className="update-button">
                Update Staff
            </button>
            </div>
        </form>
        {/* <button className="close-button" onClick={toggleUpdateAuthorPopup}>
            <img src={Close} alt="Close" />
        </button> */}
        </div>
    </div>
  )
}

export default UpdateStaffPopup
