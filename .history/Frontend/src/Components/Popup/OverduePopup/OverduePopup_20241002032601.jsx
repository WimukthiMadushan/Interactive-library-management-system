import React, { useState } from "react";
import axios from "axios";
import "./OverduePopup.css";

function OverBookPopup({ onClose, borrowId, fetchBorrows }) {
  const [borrowDetails, setBorrowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/borrow/${borrowId}`);
        if (response.data.success) {
          setBorrowDetails(response.data.data);
          console.log(borrowDetails)
        } else {
          setError("Failed to fetch borrow details.");
        }
      } catch (err) {
        setError("An error occurred while fetching the borrow details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBorrowDetails();
  }, [borrowId]);

  return (
    <div className="overdue-popup-overlay">
      <div className="overdue-popup-container">
        <h2 className="overdue-popup-title">Overdue Book Notice</h2>

        {/* Borrower Information Section 
        <div className="overdue-popup-details">
          <p><strong>Borrower Name:</strong> {borrowDetails.borrowerName}</p>
          <p><strong>Book Title:</strong> {borrowDetails.bookTitle}</p>
          <p><strong>Borrow Date:</strong> {borrowDetails.borrowDate}</p>
          <p><strong>Due Date:</strong> {borrowDetails.dueDate}</p>
        </div>
        */}

        {/* Overdue Fees Section (Optional) 
        {overdueFees && (
          <div className="overdue-popup-fees">
            <p><strong>Overdue Fees:</strong> ${overdueFees}</p>
            <button className="waive-fee-btn">Waive Fee</button>
            <button className="charge-fee-btn">Charge Fee</button>
          </div>
        )}

        <div className="overdue-popup-actions">
          <button 
            className="send-reminder-btn" 
            onClick={() => onSendReminder(borrowId)}>
            Send Reminder
          </button>
          <button 
            className="mark-returned-btn" 
            onClick={() => onMarkAsReturned(borrowId)}>
            Mark as Returned
          </button>
          <button 
            className="close-popup-btn" 
            onClick={onClose}>
            Close
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default OverBookPopup;
