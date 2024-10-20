import React, { useState } from "react";
import axios from "axios";
import "./AddReviewModal.css";

function AddReviewModal({ isOpen, setIsOpen, book }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  const handleRatingClick = (index) => {
    setRating(index + 1);
  };

  const handleSubmit = async () => {
    try {
      await axios.post(`http://localhost:5000/api/review/`, {
        BookID: book.Book_ID,
        Borrow_ID: book.Borrow_ID,
        Rating: rating,
        Review: reviewText,
      });
    } catch (error) {
      console.error("Error submitting review:", error);
    }
    setIsOpen(false);
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="modal-title">Add Review for {book.Title}</h2>
          </div>
          <div className="modal-body">
            <div className="rating-section">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`star-icon ${index < rating ? "filled" : ""}`}
                  onClick={() => handleRatingClick(index)}
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
            <textarea
              placeholder="Share your thoughts about the product..."
              className="textarea"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <div className="modal-footer">
            <button className="button-outline" onClick={() => setIsOpen(false)}>
              Cancel
            </button>
            <button className="button-primary" onClick={handleSubmit}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default AddReviewModal;
