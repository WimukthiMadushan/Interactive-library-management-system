import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OverduePopup.css";

function OverBookPopup({ onClose, borrowId, fetchBorrows }) {
  const [borrowDetails, setBorrowDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowDetails = async () => {
      console.log(borrowId)
      try {
        const response = await axios.get(`http://localhost:5001/api/borrow/overdue/${borrowId}`);
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
    <div className="return-book-popup-container" data-testid="return-book-popup">
      <div className="return-book-popup">
        <button className="close-button" onClick={onClose} data-testid="close-button">
          &times;
        </button>
        <h2>Overdue Book Details</h2>
        {borrowDetails && (
          <div>
            <p><strong>Borrower:</strong> {borrowDetails.First_Name} {borrowDetails.Last_Name}</p>
            <p><strong>Book Title:</strong> {borrowDetails.Title}</p>
            <p><strong>Borrow Date:</strong> {borrowDetails.Borrow_Date}</p>
            <p><strong>Due Date:</strong> {borrowDetails.Return_Date}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OverBookPopup;
