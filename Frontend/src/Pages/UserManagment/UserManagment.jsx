import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserManagment.css";
import PaginationButtons from "../../Components/Pagination/PaginationButtons/PaginationButtons";
import { Link } from "react-router-dom";
import NotificationModal from "../../Components/Modals/NotificationModal";
import Tabs from "../../Components/Tabs/Tabs";
import UpdateStaffPopup from "../../Components/Popup/UpdateStaffPopup/UpdateStaffPopup";
import AddStaffPopup from "../../Components/Popup/AddStaffPopup/AddStaffPopup";

function UserManagment() {
  const [users, setUsers] = useState([]);
  const [staff, setStaff] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isUpdateStaffOpen, setIsUpdateStaffOpen] = useState(false);
  const [selectedStaffId, SetSelectedStaffId] = useState(null);
  const [activeTab, setActiveTab] = useState("users");
  const [staffData, setStaffData] = useState({
    User_ID: "",
    Staff_ID: "",
    First_Name: "",
    Last_Name: "",
    Role: "",
  });

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [searchQuery, activeTab]);

  const fetchStaff = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/user/staff");
      setStaff(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [searchQuery, activeTab]);

  const filterUsers = (users) => {
    return users.filter(
      (user) =>
        user.First_Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.Last_Name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredUsers =
    activeTab === "users" ? filterUsers(users) : filterUsers(staff);

  const usersPerPage = 10;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${id}`);
      setModalMessage("User deleted successfully.");
      setShowSuccess(true);
      setUsers((prevUsers) => prevUsers.filter((user) => user.User_ID !== id));
    } catch (error) {
      setModalMessage("Failed to delete user.");
      setShowError(true);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // Ensure month and day are two digits
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  };

  // -------  For update Staff Members -------
  const toggleUpdateStaffPopup = (id) => {
    const userToUpdate = staff.find((user) => user.User_ID === id);
    setStaffData(userToUpdate);
    setIsUpdateStaffOpen(!isUpdateStaffOpen);
  };

  const togglePopup = () => {
    setIsUpdateStaffOpen(!isUpdateStaffOpen);
  };
  // ------------------------------------------

  // -------  For Add Staff Members -------
  const toggleAddPopup = () => {
    setAddPopupOpen(!isAddPopupOpen);
  };

  return (
    <div className="user-managment-outer">
      <div className="user-managment-container">
        <div className="user-managment-above">
          <div className="book-managment-image">
            <h2>User Management</h2>
          </div>
          <div className="staff-management-buttons">
            <button className="add-staff-button" onClick={toggleAddPopup}>
              Add Staff Members
            </button>
          </div>
        </div>
        <div className="user-managment-search">
          <input
            type="text"
            className="name-search"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="user-managment-table">
          {activeTab === "users" ? (
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>NIC</th>
                  <th>Mobile</th>
                  <th>Registration Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.User_ID}>
                    <td>
                      <Link
                        style={{ textDecoration: "none", color: "black" }}
                        to={`/profiledetails/${user.User_ID}`}
                      >
                        {user.User_ID}
                      </Link>
                    </td>
                    <td>{user.First_Name}</td>
                    <td>{user.Last_Name}</td>
                    <td>{user.Email}</td>
                    <td>{user.Address}</td>
                    <td>{user.NIC}</td>
                    <td>{user.Mobile}</td>
                    <td>{formatDate(user.Registered_Date)}</td>
                    <td>
                      <button
                        className="user-managment-delete-button"
                        onClick={() => handleDelete(user.User_ID)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Staff ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Designation</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.User_ID}>
                    <td>{user.User_ID}</td>
                    <td>{user.Staff_ID}</td>
                    <td>{user.First_Name}</td>
                    <td>{user.Last_Name}</td>
                    <td>{user.Role}</td>
                    <td className="action-column">
                      <button
                        className="action-button user-delete-button"
                        onClick={() => handleDelete(user.User_ID)}
                      >
                        Delete
                      </button>
                      <button
                        className="action-button user-update-button"
                        onClick={() => toggleUpdateStaffPopup(user.User_ID)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {isAddPopupOpen && (
          <AddStaffPopup
            toggleAddPopup={toggleAddPopup}
            fetchStaff={fetchStaff}
          />
        )}

        {isUpdateStaffOpen && (
          <UpdateStaffPopup
            showPopup={isUpdateStaffOpen}
            togglePopup={togglePopup}
            data={staffData}
          />
        )}

        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <NotificationModal
          show={showSuccess}
          handleClose={handleCloseSuccess}
          title={"Success"}
          message={modalMessage}
          isSuccess={true}
        />

        <NotificationModal
          show={showError}
          handleClose={handleCloseError}
          title={"Error"}
          message={modalMessage}
          isSuccess={false}
        />
      </div>
    </div>
  );
}

export default UserManagment;
