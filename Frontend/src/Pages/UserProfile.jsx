import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../Styles/UserProfile.css";
import userImage from "./../Images/Profile_pic.jpg";

function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  const User_ID = 1017;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${User_ID}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };
    fetchUserDetails();
  }, []);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/borrow/${User_ID}`
        );
        setBorrowedBooks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching borrowed books: ", error);
      }
    };
    fetchBorrowedBooks();
  }, []);

  return (
    <>
      <div className="profile-container">
        <div className="profile-left">
          <div className="profile-image-container">
            <img src={userImage} alt="Profile" className="profile-image" />
          </div>
          <h2 className="profile-name">
            {userDetails.First_Name} {userDetails.Last_Name}
          </h2>
          <p className="profile-username">@{userDetails.Username}</p>
        </div>
        <div className="profile-right">
          <h3 className="profile-section-title">Profile Details</h3>
          <ul className="profile-details-list">
            <li>
              <span className="detail-label">Email:</span> {userDetails.Email}
            </li>
            <li>
              <span className="detail-label">Address:</span>{" "}
              {userDetails.Address}
            </li>
            <li>
              <span className="detail-label">Mobile:</span> {userDetails.Mobile}
            </li>
            <li>
              <span className="detail-label">Registered Date:</span>{" "}
              {new Date(userDetails.Registered_Date).toLocaleDateString()}
            </li>
          </ul>
          <button className="edit-profile-button">Edit Profile</button>
        </div>
      </div>
      <div className="bottom-container">
        <h3 className="borrowed-books-title">Borrowed Books</h3>
        <table className="borrowed-books-table">
          <thead>
            <tr>
              <th>Borrow ID</th>
              <th>Book Title</th>
              <th>Language</th>
              <th>Borrowed Date</th>
              <th>Location</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => (
              <tr key={book.Borrow_ID}>
                <td>{book.Borrow_ID}</td>
                <td>{book.Title}</td>
                <td>{book.Language_Name.trim()}</td>
                <td>{new Date(book.Borrow_Date).toLocaleDateString()}</td>
                <td>{`Floor ${book.Floor}, Section ${book.Section}, Shelf ${book.Shelf_Number}, Row ${book.RowNum}`}</td>
                <td>date</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserProfile;
