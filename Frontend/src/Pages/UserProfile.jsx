import React, { useEffect, useState } from "react";
import { useAuth } from "./../Hooks/AuthContext.jsx";
import { Link } from "react-router-dom";
import axios from "axios";
import "./../Styles/UserProfile.css";
import userImage from "./../Images/Profile_pic.jpg";
import Hello from "./../Images/Hello.png";

function UserProfile() {
  const [userDetails, setUserDetails] = useState({});
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const { authState } = useAuth();
  const { userId, role, username } = authState;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );
        setUserDetails(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/borrow/${userId}`
        );
        setBorrowedBooks(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching borrowed books: ", error);
      }
    };
    fetchBorrowedBooks();
  }, [userId]);

  useEffect(() => {
    const fetchReservedBooks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/reserve/${userId}`
        );
        setReservedBooks(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching reserved books: ", error);
      }
    };
    fetchReservedBooks();
  }, [userId]);

  return (
    <div className="profile-container">
      <div className="profile-above">
        <div className="profile-left">
          <div className="welcome-message">
            <p>
              Hello {username}! <br />
              {role === "Administrator" || role === "Receptionist" ? (
                <>You are a {role}</>
              ) : null}
            </p>
            <img src={Hello} alt="" />
          </div>
          <img src={userImage} alt="Profile" className="profile-image" />
          <p className="profile-username">@{userDetails.Username}</p>
        </div>
        <div className="profile-right">
          <h2 className="profile-name">
            {userDetails.First_Name} {userDetails.Last_Name}
          </h2>
          <span className="profile-email">
            {userDetails.Email} <br />
          </span>
          <span className="profile-address">
            {userDetails.Address} <br />
          </span>
          <span className="profile-registered">
            Joined on:{" "}
            {new Date(userDetails.Registered_Date).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="profile-middle">
        {role === "Administrator" && (
          <div className="button-list">
            <Link to="/authormanagement">
              <button className="profile-button">Author Management</button>
            </Link>
            <Link to="/publishermanagement">
              <button className="profile-button">Publisher Management</button>
            </Link>
            <Link to="/bookmanagement">
              <button className="profile-button">Books Management</button>
            </Link>
            <Link to="/usermanagement">
              <button className="profile-button">User Management</button>
            </Link>
          </div>
        )}

        {role === "Receptionist" && (
          <div className="button-list">
            <Link to="/borrowbookmanagement">
              <button className="profile-button">Borrow Book</button>
            </Link>
            <Link to="/reseravtionbookmanagment">
              <button className="profile-button">Reservation Book</button>
            </Link>
          </div>
        )}
      </div>

      <div className="profile-bottom">
        <div id="accordion">
          <div className="card">
            <div className="card-header" id="headingOne">
              <h5 className="mb-0">
                <button
                  className="btn"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="false"
                  aria-controls="collapseOne"
                  style={{ fontSize: "1.2rem" }}
                >
                  Borrowed Books
                </button>
              </h5>
            </div>

            <div
              id="collapseOne"
              className="collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordion"
            >
              <div className="card-body">
                {borrowedBooks.length === 0 ? (
                  <p>No borrowed books</p>
                ) : (
                  <>
                    <h3>Borrowed Books</h3>
                    <table className="user-table">
                      <thead>
                        <tr>
                          <th>Borrow ID</th>
                          <th>Title</th>
                          <th>Language</th>
                          <th>Borrow Date</th>
                          <th>Location</th>
                          <th>Return Date</th>
                          <th>Renew Book</th>
                        </tr>
                      </thead>
                      <tbody>
                        {borrowedBooks.map((book) => (
                          <tr key={book.Borrow_ID}>
                            <td>{book.Borrow_ID}</td>
                            <td>{book.Title}</td>
                            <td>{book.Language}</td>
                            <td>
                              {new Date(book.Borrow_Date).toLocaleDateString()}
                            </td>
                            <td>{`Floor ${book.Floor}, Section ${book.Section}, Shelf ${book.Shelf_Number}, Row ${book.RowNum}`}</td>
                            <td>
                              {new Date(book.Return_Date).toLocaleDateString()}
                            </td>
                            <td>
                              <button className="update-button">Renew</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header" id="headingTwo">
              <h5 className="mb-0">
                <button
                  className="btn"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                  style={{ fontSize: "1.2rem" }}
                >
                  Reserved Books
                </button>
              </h5>
            </div>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordion"
            >
              <div className="card-body">
                {reservedBooks.length === 0 ? (
                  <p>No reserved books</p>
                ) : (
                  <>
                    <h3>Reserved Books</h3>
                    <table className="user-table">
                      <thead>
                        <tr>
                          <th>Reserve ID</th>
                          <th>Title</th>
                          <th>Language</th>
                          <th>Reservation Date</th>
                          <th>Location</th>
                          <th>Cancel Reservation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reservedBooks.map((book) => (
                          <tr key={book.Reserve_ID}>
                            <td>{book.Reserve_ID}</td>
                            <td>{book.Title}</td>
                            <td>{book.Language}</td>
                            <td>
                              {new Date(
                                book.Reservation_Date
                              ).toLocaleDateString()}
                            </td>
                            <td>{`Floor ${book.Floor}, Section ${book.Section}, Shelf ${book.Shelf_Number}, Row ${book.RowNum}`}</td>
                            <td>
                              <button className="delete-button">
                                Cancel Reservation
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
