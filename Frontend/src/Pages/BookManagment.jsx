import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./../Styles/BookManagment.css";
import UpdateBook from "./../Components/UpdateBook";
import AddBooks from "../Components/AddBooks";
import PaginationButtons from "../Components/PaginationButtons";
import AddBookCopy from "../Components/AddBookCopy";
import DeleteModal from "./../Components/Modals/DeleteModal";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function BookManagement() {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const [isUpdateBookOpen, setIsUpdateBookOpen] = useState(false);
  const [isAddBookCopyOpen, setIsAddBookCopyOpen] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"
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
        setMessageContent(
          error.response?.data?.message ||
            "Failed to fetch books. Please try again."
        );
        setMessageType("error");
        setShowMessageModal(true);
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
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    //console.log(bookIdToDelete);
    try {
      await axios.delete(`http://localhost:5000/api/book/${bookIdToDelete}`);
      setBooks((prevBooks) =>
        prevBooks.filter((book) => book.Book_ID !== bookIdToDelete)
      );
      setMessageContent("Book deleted successfully.");
      setMessageType("success");
    } catch (error) {
      setMessageContent(
        error.response?.data?.message ||
          "Failed to delete book. Please try again."
      );
      setMessageType("error");
    } finally {
      setShowDeleteModal(false);
      setShowMessageModal(true);
      setBookIdToDelete(null);
    }
  };

  return (
    <div className="book-management-container">
      <div className="book-management-image">
        <h2>Books Management.</h2>
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
                  <Link to={`/book/${book.Book_ID}`}>
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
                  </Link>
                </td>

                <td>{book.ISBN_Number}</td>
                <td>
                  <Link
                    to={"/"}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    {book.Title}
                  </Link>
                </td>
                <td>{book.Category}</td>
                <td>{book.Author}</td>
                <td
                  style={{ width: "15rem", height: "5rem" }}
                  className="action-column"
                >
                  <button
                    className="action-button book-managment-update-button"
                    onClick={() => toggleUpdatePopup(book.Book_ID)}
                    id={book.Book_ID}
                  >
                    Update
                  </button>
                  <button
                    className="book-managment-delete-button"
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
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleConfirm={handleConfirmDelete}
        value={"book"}
      />
      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {messageType === "success" ? "Success" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{messageContent}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowMessageModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookManagement;
