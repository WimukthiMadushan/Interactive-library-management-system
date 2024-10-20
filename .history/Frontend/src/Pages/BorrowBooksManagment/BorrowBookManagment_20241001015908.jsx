import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BorrowBookManagment.css";
import PaginationButtons from "../../Components/Pagination/PaginationButtons/PaginationButtons";
import AddBorrows from "../../Components/AddBorrow/AddBorrows";
import ReturnBookPopup from "./../../Components/Popup/ReturnBook/ReturnBookPopup";

function BorrowBookManagement() {
  const [borrows, setBorrows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddBorrowOpen, setIsAddBorrowOpen] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedBorrowId, setSelectedBorrowId] = useState(null);
  const [showExpiredList, setShowExpiredList] = useState(false);

  const itemsPerPage = 10;

  const fetchBorrows = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/borrow");
      const formattedData = response.data.map((borrow) => ({
        ...borrow,
        Borrow_Date: new Date(borrow.Borrow_Date).toISOString().split("T")[0],
        Return_Date: borrow.Return_Date
          ? new Date(borrow.Return_Date).toISOString().split("T")[0]
          : null,
      }));
      setBorrows(formattedData);
    } catch (error) {
      console.error("Error fetching borrows:", error);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredBorrows = borrows.filter(
    (borrow) =>
      borrow.User_ID &&
      borrow.User_ID.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBorrows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBorrows.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const confirmReturn = (id) => {
    setSelectedBorrowId(id);
    setShowReturnModal(true);
  };

  const toggleAddPopup = () => {
    setIsAddBorrowOpen(!isAddBorrowOpen);
  };

  const toggleReturnPopup = () => {
    setShowReturnModal(!showReturnModal);
  };

//Regarding expired book
const fetchExpiredBooks = async () => {
  try {
    const response = await axios.get("http://localhost:5001/api/borrow/expired");
    const formattedData = response.data.map((borrow) => ({
      ...borrow,
      Borrow_Date: new Date(borrow.Borrow_Date).toISOString().split("T")[0],
      Return_Date: borrow.Return_Date
        ? new Date(borrow.Return_Date).toISOString().split("T")[0]
        : null,
    }));
    setBorrows(formattedData);
  } catch (error) {
    console.error("Error fetching expired borrows:", error);
  }
};

const toggleExpiredList = () => {
  if (showExpiredList) {
    fetchBorrows();
  } else {
    fetchExpiredBooks();
  }
  setShowExpiredList(!showExpiredList);
  setCurrentPage(1);
};


  useEffect(() => {
    setCurrentPage(1);
  }, [showExpiredList]);
  
  
//idetify borrowbook state
const getBorrowStatusByDate = (borrow) => {
  const currentDate = new Date();
  const returnDate = new Date(borrow.Return_Date); // Assuming Return_Date is a string

  if (borrow.isComplete === 1) {
    return "Complete";
  } else if (currentDate > returnDate) {
    return "Overdue";
  } else {
    return "Active"; // Not yet due
  }
};


  return (
    <div className="view-authors-container" data-testid="borrow-management">
      <div className="book-management-image">
        <h2>Borrow Books Management</h2>
      </div>
      < div className="book-management-buttons">
        <button
          className="book-add"
          onClick={toggleAddPopup}
          data-testid="add-borrow-button"
        >
          Borrow Book
        </button>
        <button
          className="book-add"
          onClick={toggleExpiredList} // Correct function name
          data-testid="add-borrow-button"
        >
          {showExpiredList ? "Show All Borrows" : "Expired Books"}
        </button>
      </div>
      <div className="book-management-search">
        <input
          type="text"
          placeholder="Enter User ID"
          value={searchQuery}
          onChange={handleSearchChange}
          data-testid="search-input"
        />
      </div>
      <div className="book-management-table">
        <table data-testid="borrow-table">
          <thead>
            <tr>
              <th>Borrow ID</th>
              <th>User ID</th>
              <th>Book ID</th>
              <th>Borrow Date</th>
              <th>Borrow Time</th>
              <th>Return Date</th>
              <th>isComplete</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((borrow) => (
              <tr key={borrow.Borrow_ID} data-testid={`borrow-row-${borrow.Borrow_ID}`}>
                <td data-testid={`borrow-id-${borrow.Borrow_ID}`}>{borrow.Borrow_ID}</td>
                <td data-testid={`user-id-${borrow.Borrow_ID}`}>{borrow.User_ID}</td>
                <td data-testid={`book-id-${borrow.Borrow_ID}`}>{borrow.Book_ID}</td>
                <td data-testid={`borrow-date-${borrow.Borrow_ID}`}>{borrow.Borrow_Date}</td>
                <td data-testid={`borrow-time-${borrow.Borrow_ID}`}>{borrow.Borrow_Time}</td>
                <td data-testid={`return-date-${borrow.Borrow_ID}`}>{borrow.Return_Date}</td>
                <td data-testid={`is-complete-${borrow.Borrow_ID}`}>
                  {getBorrowStatusByDate(borrow)}
                </td>
                <td className="action-column">
                {getBorrowStatusByDate(borrow) === "Overdue" && !borrow.isComplete ? (
                  <button
                    className="action-button overdue-button"
                    onClick= ""
                    data-testid={`overdue-button-${borrow.Borrow_ID}`}
                  >
                    Overdue
                  </button>
                ) : (
                  <button
                    className="action-button return-button"
                    onClick={() => confirmReturn(borrow.Borrow_ID)}
                    disabled={borrow.isComplete === 1}
                    data-testid={`return-button-${borrow.Borrow_ID}`}
                  >
                    {borrow.isComplete ? "Returned" : "Return"}
                  </button>
                )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination" data-testid="pagination">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {isAddBorrowOpen && (
        <AddBorrows onClose={toggleAddPopup} data-testid="add-borrow-popup" />
      )}
      {showReturnModal && (
        <ReturnBookPopup
          onClose={toggleReturnPopup}
          borrowId={selectedBorrowId}
          fetchBorrows={fetchBorrows} // Pass fetchBorrows to refresh data
          data-testid="return-book-popup"
        />
      )}
    </div>
  );
}

export default BorrowBookManagement;
