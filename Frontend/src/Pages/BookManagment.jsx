import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./../Images/user.png";
import "./../Styles/BookManagment.css";
import UpdateBook from "./../Components/UpdateBook";
import AddBooks from "../Components/AddBooks";
import PaginationButtons from "../Components/PaginationButtons";
import AddBookCopy from "../Components/AddBookCopy";
import DeleteModal from "../Components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isUpdateBookOpen, setIsUpdateBookOpen] = useState(false);
  const [isAddBookCopyOpen, setIsAddBookCopyOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookIdToDelete, setBookIdToDelete] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/book/list");
        const formattedData = response.data.map((book) => ({
          ...book,
          Published_Date: new Date(book.Published_Date)
            .toISOString()
            .split("T")[0],
        }));
        setBooks(formattedData);
      } catch (error) {
        console.error("Error fetching books:", error);
        toast.error("Failed to fetch books. Please try again.");
      }
    };

    fetchBooks();
  }, [searchQuery, currentPage]);

  const filteredBooks = books.filter((book) =>
    book.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const booksPerPage = 10;
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleAddPopup = () => {
    setIsAddBookOpen(!isAddBookOpen);
  };
  const toggleAddCopyPopup = () => {
    setIsAddBookCopyOpen(!isAddBookCopyOpen);
  };

  const toggleUpdatePopup = (bookId) => {
    setIsUpdateBookOpen(!isUpdateBookOpen);
    setSelectedBookId(bookId);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (id) => {
    setBookIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/book/${bookIdToDelete}`);
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.Book_ID !== bookIdToDelete)
      );
      toast.success("Book deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete book. Please try again.");
    } finally {
      setShowModal(false);
      setBookIdToDelete(null);
    }
  };

  return (
    <div className="book-management-container">
      <div className="book-management-image">
        <img src={User} alt="User Icon" />
        <h2>Books Management</h2>
      </div>
      <div className="book-management-buttons">
        <button className="book-add" onClick={toggleAddPopup}>
          Add Book
        </button>
        <button className="book-add" onClick={toggleAddCopyPopup}>
          Add Book Copy
        </button>
      </div>
      <div className="book-management-search">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="book-management-table">
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
            {currentBooks.map((book) => (
              <tr key={book.Book_ID}>
                <td>{book.Book_ID}</td>
                <td>
                  {book.Image_Path ? (
                    <img
                      src={book.Image_Path}
                      alt={book.Title}
                      className="book-image"
                    />
                  ) : book.Image_Name ? (
                    <img
                      src={`http://localhost:5000/books/${book.Image_Name}`}
                      alt={book.Title}
                      className="book-image"
                    />
                  ) : (
                    <p>No image</p>
                  )}
                </td>
                <td>{book.ISBN_Number}</td>
                <td>{book.Title}</td>
                <td>{book.Category}</td>
                <td>{book.Author}</td>
                <td
                  style={{ width: "15rem", height: "5rem" }}
                  className="action-column"
                >
                  <button
                    className="action-button update-button"
                    onClick={() => toggleUpdatePopup(book.Book_ID)}
                    id={book.Book_ID}
                  >
                    Update
                  </button>
                  <button
                    className="action-button delete-button"
                    onClick={() => handleDelete(book.Book_ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {isAddBookOpen && (
        <AddBooks showPopup={isAddBookOpen} togglePopup={toggleAddPopup} />
      )}
      {isUpdateBookOpen && selectedBookId && (
        <UpdateBook
          showPopup={isUpdateBookOpen}
          togglePopup={toggleUpdatePopup}
          id={selectedBookId}
        />
      )}
      {isAddBookCopyOpen && (
        <AddBookCopy
          showPopup={isAddBookCopyOpen}
          togglePopup={toggleAddCopyPopup}
        />
      )}
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        value={"book"}
      />
      <ToastContainer />
    </div>
  );
}

export default BookManagement;
