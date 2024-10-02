import React, { useState } from "react";
import axios from "axios";
import "./OverduePopup.css"; // Ensure you have a corresponding CSS file

function OverduePopup({ onClose, borrowId, fetchBorrows }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConfirmOverdue = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(
        `http://localhost:5001/api/borrow/overdue/${borrowId}`
      );
      if (response.data.success) {
        console.log("Overdue handled successfully");
        fetchBorrows(); // Refresh borrow list to reflect the change
        onClose(); // Close the modal after processing
      } else {
        setError("Error processing overdue book");
      }
    } catch (err) {
      setError("Error processing overdue book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overdue-popup-container" data-testid="overdue-popup">
      <div className="overdue-popup">
        <button className="close-button" onClick={onClose} data-testid="close-button">
          &times;
        </button>
        <h2>Handle Overdue Book</h2>
        {error && <p className="error-message" data-testid="error-message">{error}</p>}
        <div className="overdue-actions">
          <button
            className="confirm-overdue-button"
            onClick={handleConfirmOverdue}
            disabled={loading}
            data-testid="confirm-overdue-button"
          >
            {loading ? "Processing..." : "Confirm Overdue"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OverduePopup;
