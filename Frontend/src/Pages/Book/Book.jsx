import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../Hooks/AuthContext";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import "./Book.css";

// Set worker URL for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

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
  const [reviews, setReview] = useState([]);
  const [numPages, setNumPages] = useState(null); // To track number of pages in PDF

  const { authState } = useAuth();
  const { userId } = authState;

  const bookId = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/book/${bookId}`
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
          `http://localhost:5001/api/bookcopy/${bookId}`
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

      const response = await axios.post(`http://localhost:5001/api/reserve`, {
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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div className="book-page-container" data-testid="book-page">
      <div className="book-details" data-testid="book-details">
        <div className="book-content" data-testid="book-content">
          <div className="bookpage-book-image">
            <img src={book.Image_Path} alt="" data-testid="book-image" />
          </div>

          <div className="book-text" data-testid="book-text">
            <h1 data-testid="book-title">{book.Title}</h1>
            <p className="book-description" data-testid="book-description">
              {book.Description}
            </p>
            <div className="book-meta" data-testid="book-meta">
              <p>
                <strong>ISBN:</strong>{" "}
                <span data-testid="book-isbn">{book.ISBN_Number}</span>
              </p>
              <p>
                <strong>Author:</strong>{" "}
                <span data-testid="book-author">{book.Author_Name}</span>
              </p>
              <p>
                <strong>Category:</strong>{" "}
                <span data-testid="book-category">{book.Category_Name}</span>
              </p>
              <p>
                <strong>Published Date:</strong>{" "}
                <span data-testid="book-published-date">
                  {book.Published_Date}
                </span>
              </p>
            </div>
          </div>
        </div>

        <h2
          style={{ marginTop: "2rem" }}
          data-testid="available-copies-heading"
        >
          Available Copies
        </h2>
        <div className="book-copy-details" data-testid="book-copy-details">
          {bookCopy.map((copy) => (
            <div
              key={copy.Copy_ID}
              className="book-copy-card"
              data-testid={`book-copy-${copy.Copy_ID}`}
            >
              <ul>
                <li>
                  <strong>Language:</strong>{" "}
                  <span data-testid={`copy-language-${copy.Copy_ID}`}>
                    {copy.Language}
                  </span>
                </li>
                <li>
                  <strong>Location:</strong>
                  <span data-testid={`copy-location-${copy.Copy_ID}`}>
                    You can pick the book up from the{" "}
                    <em>{copy.Floor} Floor</em>, <em>{copy.Section} Section</em>
                    ,<em>Shelf {copy.Shelf_Number}</em>, Row{" "}
                    <em>{copy.RowNum}</em>.
                  </span>
                </li>
                <li>
                  <strong>Status:</strong>
                  {copy.isReserved ? (
                    <span
                      className="status reserved"
                      data-testid={`copy-status-${copy.Copy_ID}`}
                    >
                      Reserved
                    </span>
                  ) : copy.isBorrowed ? (
                    <span
                      className="status borrowed"
                      data-testid={`copy-status-${copy.Copy_ID}`}
                    >
                      Borrowed
                    </span>
                  ) : (
                    <span
                      className="status available"
                      data-testid={`copy-status-${copy.Copy_ID}`}
                    >
                      Available for borrowing or reservation
                    </span>
                  )}
                </li>
              </ul>
              <button
                className="reserve-button"
                disabled={copy.isReserved || copy.isBorrowed}
                onClick={() => handleReserve(copy.Copy_ID)}
                data-testid={`reserve-button-${copy.Copy_ID}`}
              >
                {copy.isReserved || copy.isBorrowed
                  ? "Not Available"
                  : "Reserve Book"}
              </button>
            </div>
          ))}
        </div>

        <div className="book-preview">
          <h1>Book Preview</h1>
          <div className="pdf-preview">
            <Document
              file="https://drive.google.com/uc?export=download&id=14o-Tx2q7czbpkwgJHvBDjjYTvIVbu1SQ"
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {/* Render first 3 pages */}
              {[1, 2, 3].map((page) => (
                <Page key={page} pageNumber={page} />
              ))}
            </Document>
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

        {/* Reservation Popup */}
        {showReservationPopup && (
          <div className="popup-background" data-testid="reservation-popup">
            <div className="reservation-popup">
              <h3>Select Reservation Start and End Time</h3>
              <label htmlFor="start-time">Start Date & Time:</label>
              <input
                type="datetime-local"
                id="start-time"
                value={startDateTime}
                onChange={(e) => setStartDateTime(e.target.value)}
                data-testid="start-time-input"
              />
              <label htmlFor="end-time">End Date & Time:</label>
              <input
                type="datetime-local"
                id="end-time"
                value={endDateTime}
                onChange={(e) => setEndDateTime(e.target.value)}
                data-testid="end-time-input"
              />
              <div className="reservation-buttons">
                <button
                  className="confirm-button"
                  onClick={confirmReservation}
                  disabled={loading}
                  data-testid="confirm-reservation-button"
                >
                  {loading ? "Reserving..." : "Confirm Reservation"}
                </button>
                <button
                  className="cancel-button"
                  onClick={handleCancelReservation}
                  data-testid="cancel-reservation-button"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Login Popup */}
        {showLoginPopup && (
          <div className="popup-background" data-testid="login-popup">
            <div className="login-required-popup">
              <h3>You need to be logged in to reserve a book.</h3>
              <button
                onClick={handleCloseLoginPopup}
                data-testid="close-login-popup-button"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Book;
