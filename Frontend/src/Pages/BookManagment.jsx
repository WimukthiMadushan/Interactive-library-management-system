import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../Styles/BookManagment.css";
import User from "./../Images/user.png";

function BookManagment() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/book/list");

        const formattedData = response.data.map((book) => {
          const addOneDay = (dateString) => {
            const date = new Date(dateString);
            date.setDate(date.getDate());
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
          };

          return {
            ...book,
            Published_Date: addOneDay(book.Published_Date),
          };
        });

        setBooks(formattedData);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="book-managment-container">
      <div className="book-managment-image">
        <img src={User} alt="" />
        <h2>Books Management</h2>
      </div>
      <div className="book-managment-buttons">
        <button className="book-add">Add Book</button>
      </div>
      <div className="book-managment-search">
        <input type="text" placeholder="Search books..." />
      </div>
      <div className="book-managment-table">
        <table>
          <thead>
            <tr>
              <th>Book ID</th>
              <th>Image</th>
              <th>ISBN</th>
              <th>Title</th>
              <th>Category</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.Book_ID}>
                <td>{book.Book_ID}</td>
                <td>
                  {book.Image_Path ? (
                    <img
                      src={book.Image_Path}
                      alt={book.Title}
                      className="book-image"
                    />
                  ) : (
                    book.Image_Name && (
                      <img
                        src={`http://localhost:5000/books/${book.Image_Name}`}
                        alt={book.Title}
                        className="book-image"
                      />
                    )
                  )}
                </td>
                <td>{book.ISBN_Number}</td>
                <td>{book.Title}</td>
                <td>{book.Category}</td>
                <td>{book.Author}</td>
                <td className="action-column">
                  <button className="action-button update-button">
                    Update
                  </button>
                  <button className="action-button delete-button">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">{/* Pagination buttons go here */}</div>
    </div>
  );
}

export default BookManagment;
