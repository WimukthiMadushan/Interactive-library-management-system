import React, { useEffect } from "react";
import "./../Styles/Book.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
  }, []);

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
  }, []);

  return (
    <div className="book-container">
      <div className="book-details">
        <h1>{book.Title}</h1>
        <p>
          <strong>Description:</strong> {book.Description}
        </p>
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
                <strong>Location:</strong> Floor {copy.Floor}, Section{" "}
                {copy.Section}, Shelf {copy.Shelf_Number}, Row {copy.RowNum}
              </li>
              <li>
                <strong>Is Reserved:</strong> {copy.isReserved ? "Yes" : "No"}
              </li>
              <li>
                <strong>Is Borrowed:</strong> {copy.isBorrowed ? "Yes" : "No"}
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Book;
