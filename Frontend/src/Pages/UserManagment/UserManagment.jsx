import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserManagment.css";
import PaginationButtons from "../../Components/Pagination/PaginationButtons/PaginationButtons";
import { Link } from "react-router-dom";
import NotificationModal from "../../Components/Modals/NotificationModal";

function UserManagment() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/user");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [searchQuery]);

  const filteredUsers = users.filter(
    (user) =>
      user.First_Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.Last_Name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      await axios.delete(`http://localhost:5001/api/user/${id}`);
      setModalMessage("Book deleted successfully.");
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

  return (
    <div className="user-managment-outer">
      <div className="user-managment-container">
        <div className="user-managment-above">
          <div className="book-managment-image">
            <h2>User Management</h2>
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
        <div className="user-managment-table">
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
        </div>
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
