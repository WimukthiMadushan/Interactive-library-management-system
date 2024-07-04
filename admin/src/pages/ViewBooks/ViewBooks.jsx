import React, { useState,useEffect } from 'react';
import './ViewBooks.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ViewBooks = ({url}) => {

  const navigate = useNavigate();
  // Hardcoded data
  const [books, setBooks] = useState([]);

  // Fetch the data from the backend
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${url}/api/book/list`); // Adjust the URL as needed
      
      const formattedData = response.data.map(book => {
        const addOneDay = (dateString) => {
          const date = new Date(dateString);
          date.setDate(date.getDate());
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
  
        return {
          ...book,
          Published_Date: addOneDay(book.Published_Date)
        };
      });
      setBooks(formattedData);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

    
    const handleDelete = async (bookID) => {
      const confirmed = window.confirm('Are you sure you want to delete this book?');
      if (confirmed) {
        try {
          await axios.delete(`${url}/api/book/${bookID}`);
          await fetchBooks();
        } catch (error) {
          console.error('Error deleting book:', error);
        }
      }
    };
  
    useEffect(() => {
      fetchBooks();
    }, []);


  return (
    <div className="view-books-container">
      <h1>Books</h1>
      <table className="books-table">
        <thead>
          <tr>
            <th>Book ID</th>
            <th>ISBN Number</th>
            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Published Date</th>
            <th>Category</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.Book_ID}>
              <td>{book.Book_ID}</td>
              <td>{book.ISBN_Number}</td>
              <td>{book.Title}</td>
              <td>{book.Author}</td>
              <td>{book.Description}</td>
              <td>{book.Published_Date}</td>
              <td>{book.Category}</td>
              <td>
                {book.Image_Path ? (
                  <img src={`${url}/books/${book.Image_Path}`} alt={book.Title} className="book-image" />
                ) : (
                  'No Image'
                )}
              </td>
              <td className="action-column">
                <button className="action-button update-button" onClick={() => navigate(`/updatebook/${book.Book_ID}`)}>
                  Update
                </button>
                <button className="action-button delete-button" onClick={() => handleDelete(book.Book_ID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBooks;
