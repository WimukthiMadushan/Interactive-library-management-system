import React, { useState } from "react";
import axios from "axios";
import "./OverduePopup.css"; // Make sure you have a CSS file for styling

function OverduePopup({ onClose, borrowId, fetchBorrows }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmOverdue = async () => {
    setLoading(true);
    setError("");
    try {
      // Make an API call to handle the overdue action (for example, sending a notification or updating the borrow status)
      await axios.post(`http://localhost:5001/api/borrow/${borrowId}`);
      fetchBorrows(); // Fetch updated borrow data
      onClose(); // Close the popup after action
    } catch (err) {
      setError("Error handling overdue book.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overdue-popup-container" data-testid="overdue-book-popup">
      <div className="overdue-popup">
        <button className="close-button" onClick={onClose} data-testid="close-button">
          &times;
        </button>
        <h2>Overdue Book Action</h2>
        {error && <p className="error-message" data-testid="error-message">{error}</p>}
        <div className="overdue-actions">
          <button
            className="confirm-overdue-button"
            onClick={handleConfirmOverdue}
            disabled={loading}
            data-testid="confirm-overdue-button"
          >
            {loading ? "Processing..." : "Handle Overdue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverduePopup;
