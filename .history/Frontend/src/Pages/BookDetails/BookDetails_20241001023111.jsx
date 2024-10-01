import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./../../Hooks/AuthContext.jsx";
import { Modal, Button } from "react-bootstrap";
import "./BookDetails.css";
import AddReviewModal from "./../../Components/AddReview/AddReviewModal.jsx";
import NotificationModal from "./../../Components/Modals/NotificationModal";

function BookDetails() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [reservedBooks, setReservedBooks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookToRenew, setBookToRenew] = useState(null);
  const [isRenewing, setIsRenewing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const { authState } = useAuth();
  const { userId } = authState;

  // Close success and error modals
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  useEffect(() => {
    const fetchBooks = async (url, setter) => {
      try {
        const response = await axios.get(url);
        setter(response.data);
      } catch (error) {
        console.error(`Error fetching books from ${url}:`, error.message);
      }
    };

    fetchBooks(`http://localhost:5001/api/borrow/${userId}`, setBorrowedBooks);
    fetchBooks(`http://localhost:5001/api/reserve/${userId}`, setReservedBooks);
  }, [userId]);

  console.log(reservedBooks);

  // Handle renewal of books
  const handleRenew = async () => {
    setIsRenewing(true);
    try {
      const response = await axios.put(
        `http://localhost:5001/api/borrow/renew/${bookToRenew.Book_ID}`
      );
      if (response.data.success) {
        const updatedBorrowedBooks = borrowedBooks.map((book) =>
          book.Book_ID === bookToRenew.Book_ID
            ? { ...book, Return_Date: response.data.newReturnDate }
            : book
        );
        setBorrowedBooks(updatedBorrowedBooks);
        setModalMessage("Book renewed successfully.");
        setShowSuccess(true);
      } else {
        setModalMessage(response.data.message || "Unable to renew the book.");
        setShowError(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data.message || "Error renewing the book.";
      setModalMessage(errorMessage);
      setShowError(true);
    } finally {
      setIsRenewing(false);
      setShowConfirmModal(false);
      setBookToRenew(null);
    }
  };

  // Handle opening review modal
  const handleAddReview = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  // Handle closing modals
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  // Open confirmation modal for renewals
  const handleOpenConfirmModal = (book) => {
    setBookToRenew(book);
    setShowConfirmModal(true);
  };

  // Handle reservation cancellation
  const handleCancelReservation = async (reserveId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5001/api/reserve/cancel/${reserveId}`
      );
      setModalMessage(response.data.message);
      setShowSuccess(true);
      const updatedReservedBooks = reservedBooks.filter(
        (book) => book.Reserve_ID !== reserveId
      );
      setReservedBooks(updatedReservedBooks);
    } catch (error) {
      const errorMessage =
        error.response?.data.message || "Error canceling reservation.";
      setModalMessage(errorMessage);
      setShowError(true);
    }
  };

  //Identify borrowBook states
  const getBorrowStatusByDate = (borrow) => {
    const currentDate = new Date();
    const returnDate = new Date(borrow.Return_Date);
    let color;
  
    if (borrow.isComplete === 1) {
      return "Complete";
    } else if (currentDate > returnDate) {
      return "Overdue";
      color = "red";
    } else {
      return "Active";
      color = "black";
    }
  };

  return (
    <div className="book-details-container">
      <div className="book-details-header">
        <h1>My Library</h1>
      </div>

      <div className="book-details-cards">
        <div className="book-details-card">
          <div className="book-details-card-header">
            <h2>Borrowed Books</h2>
          </div>
          <div className="book-details-card-content">
            {borrowedBooks.length === 0 ? (
              <p>No borrowed books</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Borrow ID</th>
                    <th>Title</th>
                    <th>Language</th>
                    <th>Borrow Date</th>
                    <th>Borrow Time</th>
                    <th>Location</th>
                    <th>Return Date</th>
                    <th>Renew Book</th>
                    <th>Add Review</th>
                  </tr>
                </thead>
                <tbody>
                  {borrowedBooks.map((book) => (
                    <tr key={book.Borrow_ID}>
                      <td>{book.Borrow_ID}</td>
                      <td className="font-medium">{book.Title}</td>
                      <td>{book.Language_Name}</td>
                      <td>{new Date(book.Borrow_Date).toLocaleDateString()}</td>
                      <td>{book.Borrow_Time}</td>
                      <td>
                        {`Floor ${book.Floor}, Section ${book.Section}, Shelf ${book.Shelf_Number}, Row ${book.RowNum}`}
                      </td>
                      <td><span style={{ color }}>{new Date(book.Return_Date).toLocaleDateString()}</span></td>
                      <td>
                        <button
                          className="update-button"
                          onClick={() => handleOpenConfirmModal(book)}
                        >
                          Renew
                        </button>
                      </td>
                      <td>
                        <button
                          className="add-review-button"
                          onClick={() => handleAddReview(book)}
                        >
                          Add Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="book-details-card">
          <div className="book-details-card-header">
            <h2>Reserved Books</h2>
          </div>
          <div className="book-details-card-content">
            {reservedBooks.length === 0 ? (
              <p>No reserved books</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Reserve ID</th>
                    <th>Title</th>
                    <th>Language</th>
                    <th>Reservation Date</th>
                    <th>Reservation Time</th>
                    <th>Reservation End Time</th>
                    <th>Location</th>
                    <th>Cancel Reservation</th>
                    <th>Add Review</th>
                  </tr>
                </thead>
                <tbody>
                  {reservedBooks.map((book) => (
                    <tr key={book.Reserve_ID}>
                      <td>{book.Reserve_ID}</td>
                      <td>{book.Title}</td>
                      <td>{book.Language}</td>
                      <td>
                        {new Date(book.Reserve_Date).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </td>
                      <td>{book.Reserve_Time}</td>
                      <td>{book.Reserve_End_Time}</td>
                      <td>
                        {`Floor ${book.Floor}, Section ${book.Section}, Shelf ${book.Shelf_Number}, Row ${book.RowNum}`}
                      </td>
                      <td>
                        <button
                          className="cancel-reservation-button"
                          onClick={() =>
                            handleCancelReservation(book.Reserve_ID)
                          }
                        >
                          Cancel
                        </button>
                      </td>
                      <td>
                        <button
                          className="add-review-button"
                          onClick={() => handleAddReview(book)}
                        >
                          Add Review
                        </button>
                      </td>
                      
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddReviewModal
          isOpen={isModalOpen}
          setIsOpen={handleCloseModal}
          book={selectedBook}
        />
      )}

      {/* Bootstrap Modal for confirmation */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Renewal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to renew this book?</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="dark" onClick={handleRenew} disabled={isRenewing}>
            {isRenewing ? "Confirming..." : "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success and Error Notification Modals */}
      <NotificationModal
        show={showSuccess}
        handleClose={handleCloseSuccess}
        title="Success"
        message={modalMessage}
      />
      <NotificationModal
        show={showError}
        handleClose={handleCloseError}
        title="Error"
        message={modalMessage}
      />
    </div>
  );
}

export default BookDetails;
