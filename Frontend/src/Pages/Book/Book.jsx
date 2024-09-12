import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthContext";
import axios from "axios";
import "./Book.css";

function Book() {
  const location = useLocation();
  const [book, setBook] = useState({});
  const [bookCopy, setBookCopy] = useState([]);
  const [selectedCopyId, setSelectedCopyId] = useState(null);
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showReservationPopup, setShowReservationPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  const { authState } = useAuth();
  const { userId } = authState;

  const bookId = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/book/${bookId}`
        );
        setBook(response.data);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchBook();
  }, [bookId]);

  useEffect(() => {
    const fetchBookCopy = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/bookcopy/${bookId}`
        );
        setBookCopy(response.data);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchBookCopy();
  }, [bookId]);

  const handleReserve = (copyId) => {
    if (!userId) {
      setShowReservationPopup(false);
      setShowLoginPopup(true);
      return;
    }
    setSelectedCopyId(copyId);
    setShowReservationPopup(true);
  };

  const confirmReservation = async () => {
    setLoading(true);
    try {
      const startDate = new Date(startDateTime);
      const endDate = new Date(endDateTime);

      const reserveDate = startDate.toISOString().split("T")[0];
      const reserveStartTime = startDate
        .toISOString()
        .split("T")[1]
        .slice(0, 5);
      const reserveEndTime = endDate.toISOString().split("T")[1].slice(0, 5);

      const response = await axios.post(`http://localhost:5000/api/reserve`, {
        UserID: userId,
        Copy_ID: selectedCopyId,
        isComplete: 0,
        Reserve_Date: reserveDate,
        Reserve_Time: reserveStartTime,
        Reserve_End_Time: reserveEndTime,
      });

      setBookCopy((prevCopies) =>
        prevCopies.map((copy) =>
          copy.Copy_ID === selectedCopyId ? { ...copy, isReserved: true } : copy
        )
      );
      setShowReservationPopup(false);
    } catch (error) {
      console.log(error.message);
      alert("Error reserving book. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = () => {
    setShowReservationPopup(false);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };

  return (
    <div className="book-page-container">
      <div className="book-details">
        <div className="book-content">
          <div className="bookpage-book-image">
            <img src={book.Image_Path} alt="" />
          </div>

          <div className="book-text">
            <h1>{book.Title}</h1>
            <p className="book-description">{book.Description}</p>
            <div className="book-meta">
              <p>
                <strong>ISBN:</strong> {book.ISBN_Number}
              </p>
              <p>
                <strong>Author:</strong> {book.Author_Name}
              </p>
              <p>
                <strong>Category:</strong> {book.Category_Name}
              </p>
              <p>
                <strong>Published Date:</strong> {book.Published_Date}
              </p>
            </div>
          </div>
        </div>

        <h2 style={{ marginTop: "2rem" }}>Available Copies</h2>
        <div className="book-copy-details">
          {bookCopy.map((copy) => (
            <div key={copy.Copy_ID} className="book-copy-card">
              <ul>
                <li>
                  <strong>Language:</strong> {copy.Language}
                </li>
                <li>
                  <strong>Location:</strong> You can pick the book up from the{" "}
                  <em>{copy.Floor} Floor</em>, <em>{copy.Section} Section</em>,{" "}
                  <em>Shelf {copy.Shelf_Number}</em>, Row <em>{copy.RowNum}</em>
                  .
                </li>
                <li>
                  <strong>Status:</strong>
                  {copy.isReserved ? (
                    <span className="status reserved">Reserved</span>
                  ) : copy.isBorrowed ? (
                    <span className="status borrowed">Borrowed</span>
                  ) : (
                    <span className="status available">
                      Available for borrowing or reservation
                    </span>
                  )}
                </li>
              </ul>
              <button
                className="reserve-button"
                disabled={copy.isReserved || copy.isBorrowed}
                onClick={() => handleReserve(copy.Copy_ID)}
              >
                {copy.isReserved || copy.isBorrowed
                  ? "Not Available"
                  : "Reserve Book"}
              </button>
            </div>
          ))}
        </div>

        {/* Reservation Popup */}
        {showReservationPopup && (
          <div className="popup-background">
            <div className="reservation-popup">
              <h3>Select Reservation Start and End Time</h3>
              <label htmlFor="start-time">Start Date & Time:</label>
              <input
                type="datetime-local"
                id="start-time"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
              />
              <label htmlFor="end-time">End Date & Time:</label>
              <input
                type="datetime-local"
                id="end-time"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
              />
              <div className="button-group">
                <button
                  className="confirm-reservation"
                  onClick={confirmReservation}
                  disabled={loading}
                >
                  {loading ? "Reserving..." : "Confirm Reservation"}
                </button>
                <button
                  className="cancel-reservation"
                  onClick={handleCancelReservation}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Login Required Popup */}
        {showLoginPopup && (
          <div className="popup-background">
            <div className="login-required-popup">
              <h3>You need to be logged in to reserve a book.</h3>
              <button onClick={handleCloseLoginPopup}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;
