import React, { useState } from "react";
import axios from "axios";
import "./OverduePopup.css";

function ReturnBookPopup({ onClose, borrowId, fetchBorrows }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmReturn = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `http://localhost:5001/api/borrow/return/${borrowId}`
      );
      if (response.data.success) {
        console.log("Book returned successfully");
        fetchBorrows(); // Refresh borrows list
        onClose(); // Close the modal
      } else {
        setError("Error returning the book");
      }
    } catch (err) {
      setError("Error returning the book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="return-book-popup-container" data-testid="return-book-popup">
      <div className="return-book-popup">
        <button className="close-button" onClick={onClose} data-testid="close-button">
          &times;
        </button>
        <h2>Confirm Return</h2>
        {error && <p className="error-message" data-testid="error-message">{error}</p>}
        <div className="return-book-actions">
          <button
            className="confirm-return-button"
            onClick={handleConfirmReturn}
            disabled={loading}
            data-testid="confirm-return-button"
          >
            {loading ? "Returning..." : "Confirm Return"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverBookPopup;
