import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../Styles/UserManagment.css";
import User from "./../Images/user.png";

function UserManagment() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user");
        console.log(users);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-managment-container">
      <div className="user-managment-above">
        <div className="book-managment-image">
          <img src={User} alt="" />
          <h2>User Management</h2>
        </div>
      </div>
      <div className="user-managment-buttons">
        <button className="book-add">Add User</button>
      </div>
      <div className="user-managment-search">
        <input
          type="text"
          className="role-search"
          placeholder="Search by role..."
        />
        <input
          type="text"
          className="name-search"
          placeholder="Search by name..."
        />
      </div>
      <div className="user-managment-table">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Role</th>
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
            {users.map((user) => (
              <tr key={user.User_ID}>
                <td>{user.User_ID}</td>
                <td>{user.role}</td>
                <td>{user.First_Name}</td>
                <td>{user.Last_Name}</td>
                <td>{user.Email}</td>
                <td>{user.Address}</td>
                <td>{user.NIC}</td>
                <td>{user.Mobile}</td>
                <td>{user.registration_date}</td>
                <td>
                  <button className="action-button user-update-button">
                    Update
                  </button>
                </td>
                <td>
                  <button className="action-button user-delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="user-managment-pagination">
        {/* Pagination buttons go here */}
      </div>
    </div>
  );
}

export default UserManagment;
