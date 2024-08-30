import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ReservationManagment.css";
import PaginationButtons from "./../../Components/Pagination/PaginationButtons/PaginationButtons";
import NotificationModal from "./../../Components/Modals/NotificationModal";

function ReservationManagment() {
  const [reservations, setReservations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  // Fetch the data from the backend
  const fetchReservations = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/reserve`);
      const formattedData = response.data.map((reserve) => {
        const addOneDay = (dateString) => {
          const date = new Date(dateString);
          date.setDate(date.getDate());
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        return {
          ...reserve,
          Reserve_Date: addOneDay(reserve.Reserve_Date),
        };
      });
      setReservations(formattedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = async (reserveId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/reserve/cancel/${reserveId}`
      );
      setModalMessage("Reservation cancelled successfully.");
      setShowSuccess(true);
      fetchReservations();
    } catch (error) {
      setModalMessage("Error cancelling reservation.");
      setShowError(true);
      console.error("Error deleting reservation:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredReservations = reservations.filter(
    (reservation) =>
      reservation.User_ID &&
      reservation.User_ID.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredReservations.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredReservations.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="view-publishers-container">
      <div className="book-management-image">
        <h2>Book Reservation Management</h2>
      </div>
      <div className="book-management-search">
        <input
          type="text"
          placeholder="Enter User ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <table className="reservation-table">
        <thead>
          <tr>
            <th>Reserve ID</th>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Reserve Date</th>
            <th>Reserve Time</th>
            <th>Reserve End Time</th>
            <th>Is Complete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((reservation) => (
            <tr key={reservation.Reserve_ID}>
              <td>{reservation.Reserve_ID}</td>
              <td>{reservation.User_ID}</td>
              <td>{reservation.Book_ID}</td>
              <td>{reservation.Reserve_Date}</td>
              <td>{reservation.Reserve_Time}</td>
              <td>{reservation.Reserve_End_Time}</td>
              <td>
                {reservation.isComplete === 1 ? "Complete" : "In progress"}
              </td>
              <td className="action-column">
                <button
                  className="reservation-delete-button"
                  onClick={() => handleCancel(reservation.Reserve_ID)}
                >
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <NotificationModal
        show={showSuccess}
        handleClose={handleCloseSuccess}
        title={"Success"}
        message={modalMessage}
        isSuccess={true}
      />

      <NotificationModal
        show={showError}
        handleClose={handleCloseError}
        title={"Error"}
        message={modalMessage}
        isSuccess={false}
      />
    </div>
  );
}

export default ReservationManagment;
