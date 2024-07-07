import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "./../Hooks/AuthContext.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../Styles/Book.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Book() {
  const location = useLocation();
  const [book, setBook] = useState({});
  const [bookCopy, setBookCopy] = useState([]);
  const [selectedCopyId, setSelectedCopyId] = useState(null);
  const [reviews, setReview] = useState([]);
  const [reservationDate, setReservationDate] = useState(new Date());
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showReservationPopup, setShowReservationPopup] = useState(false);

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
        console.log(response.data);
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

  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/review/${bookId}`
        );
        setReview(response.data);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchReview();
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
    try {
      const reserveDate = reservationDate.toISOString().split("T")[0];
      const reserveTime = reservationDate.toTimeString().slice(0, 5);
      const reserveEndTime = new Date(reservationDate.getTime() + 180 * 60000)
        .toTimeString()
        .slice(0, 5);

      const response = await axios.post(`http://localhost:5000/api/reserve`, {
        UserID: userId,
        Copy_ID: selectedCopyId,
        isComplete: 0,
        Reserve_Date: reserveDate,
        Reserve_Time: reserveTime,
        Reserve_End_Time: reserveEndTime,
      });

      // Update the local state to mark the copy as reserved
      setBookCopy((prevCopies) =>
        prevCopies.map((copy) =>
          copy.Copy_ID === selectedCopyId ? { ...copy, isReserved: true } : copy
        )
      );

      setShowReservationPopup(false);
      toast.success("Reservation Succesfull..", {
        closeButton: false,
      });
    } catch (error) {
      console.error("Error reserving book:", error.message);
      toast.error("Error reserving book.", {
        closeButton: false,
      });
    }
  };

  const handleCancelReservation = () => {
    setShowReservationPopup(false);
  };

  const closePopupOnOverlayClick = (event) => {
    if (event.target.classList.contains("popup-background")) {
      setShowReservationPopup(false);
      setShowLoginPopup(false);
    }
  };

  return (
    <div className="book-page-container">
      <div className="book-details">
        <div className="book-content">
          <div className="book-text">
            <h1>{book.Title}</h1>
            <p>{book.Description}</p>
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
          <div className="book-image">
            <img src={book.Image_Path} alt="" />
          </div>
        </div>
        <div className="reviews">
          <h2>Reviews</h2>
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.Review_ID} className="review-card">
                <div className="review-header">
                  <span className="review-username">{review.Username}</span>
                  <span className="review-rating">
                    {Array(review.Rating).fill("⭐")}
                  </span>
                </div>
                <p className="review-text">{review.Review}</p>
                <p className="review-date">
                  {new Date(review.Review_Date).toLocaleDateString()}
                </p>
              </div>
            ))
          )}
        </div>
        {/* 
        <div className="pdf">
          <PdfViewer pdfLink={book.PDF_Link} />
        </div>*/}
        <ToastContainer />
      </div>

      <div className="book-copy-details">
        <h2>Available Copies</h2>
        {bookCopy.map((copy) => (
          <div key={copy.Copy_ID} className="book-copy-card">
            <ul>
              <li>
                <strong>Language:</strong> {copy.Language}
              </li>
              <li>
                <strong>Location:</strong> You can pick the book up from the{" "}
                <em>{copy.Floor} Floor</em>, <em>{copy.Section} Section</em>,{" "}
                <em>Shelf {copy.Shelf_Number}</em>, Row <em>{copy.RowNum}</em>.
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
        <div className="popup-background" onClick={closePopupOnOverlayClick}>
          <div className="reservation-popup">
            <h3>Choose Reservation Date and Time</h3>
            <DatePicker
              selected={reservationDate}
              onChange={(date) => setReservationDate(date)}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              className="date-picker"
            />
            <div className="button-group">
              <button
                className="confirm-reservation"
                onClick={confirmReservation}
              >
                Confirm Reservation
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
        <div className="popup-background" onClick={closePopupOnOverlayClick}>
          <div className="login-required-popup">
            <p>You need to be logged in to make a reservation.</p>
            <button onClick={() => setShowLoginPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Book;
