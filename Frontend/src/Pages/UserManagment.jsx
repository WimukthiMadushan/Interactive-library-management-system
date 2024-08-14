import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../Styles/UserManagment.css";
import User from "./../Images/user.png";
import PaginationButtons from "../Components/PaginationButtons";
import DeleteModal from "../Components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserManagment() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

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

  const handleDelete = (id) => {
    setUserIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/user/${userIdToDelete}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.User_ID !== userIdToDelete)
      );
      toast.success("User deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete user. Please try again.");
    } finally {
      setShowModal(false);
      setUserIdToDelete(null);
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
    <div className="user-managment-container">
      <div className="user-managment-above">
        <div className="book-managment-image">
          <img src={User} alt="User" />
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
                <td>{user.User_ID}</td>
                <td>{user.First_Name}</td>
                <td>{user.Last_Name}</td>
                <td>{user.Email}</td>
                <td>{user.Address}</td>
                <td>{user.NIC}</td>
                <td>{user.Mobile}</td>
                <td>{formatDate(user.Registered_Date)}</td>
                <td>
                  <button
                    className="action-button user-delete-button"
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
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        value={"user"}
      />
      <ToastContainer />
    </div>
  );
}

export default UserManagment;
