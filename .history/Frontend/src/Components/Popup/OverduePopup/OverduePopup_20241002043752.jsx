import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OverduePopup.css";

function OverBookPopup({ onClose, borrowId, fetchBorrows }) {
  const [borrowDetails, setBorrowDetails] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBorrowDetails = async () => {
      console.log(borrowId)
      try {
        const response = await axios.get(`http://localhost:5001/api/borrow/overdue/${borrowId}`);
        console.log(response)
        if (response.data.success) {
          setBorrowDetails(response.data.data);
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
            <p><strong>Borrower:</strong> {borrowDetails[0].First_Name} {borrowDetails[0].Last_Name}</p>
            <p><strong>Book Title:</strong> {borrowDetails[0].Title}</p>
            <p><strong>Borrow Date:</strong> {new Date(borrowDetails[0].Borrow_Date).toLocaleDateString()} 
            <strong>Borrow Time:</strong> {new Date(borrowDetails[0].Borrow_Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p><strong>Due Date:</strong> {new Date(borrowDetails[0].Borrow_Date).toLocaleDateString()}
            <strong>        Due Time:</strong> {new Date(borrowDetails[0].Borrow_Date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OverBookPopup;
