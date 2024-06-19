import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "./../Styles/Book.css"; // Import the CSS file for styling

function Book() {
  const location = useLocation();
  const [book, setBook] = useState({});
  const [bookCopy, setBookCopy] = useState([]);
  const bookId = location.pathname.split("/").pop();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/book/${bookId}`
        );
        setBook(response.data);
        console.log("Book data:", response.data);
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
        console.log("Book copy data:", response.data);
      } catch (error) {
        console.log("Error fetching data:", error.message);
      }
    };
    fetchBookCopy();
  }, [bookId]);

  const handleReserve = (copyId) => {
    alert(`Book with ID ${copyId} reserved!`);
    // You can replace the alert with your actual reserve logic
  };

  return (
    <div className="book-container">
      <div className="book-details">
        <h1>{book.Title}</h1>
        <p>{book.Description}</p>
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
      <div className="book-copy-details">
        <h1>Available Copies</h1>
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
    </div>
  );
}

export default Book;
