import React from "react";
import "./ReturnBookPopup.css";

function ReturnBookPopup() {
  const handleConfirmReturn = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5001/api/borrow/return/${selectedBorrowId}`
      );
      if (response.data.success) {
        console.log("Book returned successfully");
        setShowReturnModal(false);
        fetchBorrows(); // Fetch updated data
      } else {
        console.log("Error returning the book");
      }
    } catch (error) {
      console.error("Error returning the book:", error);
    }
  };

  return (
    <div className="add-borrow-popup-container">
      <div className="add-borrow-popup">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <form className="add-borrow-container" onSubmit={onSubmitHandler}>
          <div className="add-borrow-borrow">
            <h1>Borrow Book</h1>
            <div className="input-div">
              <input
                onChange={handleChange}
                value={data.userId}
                name="userId"
                type="text"
                placeholder="User ID"
                required
              />
            </div>

            <div className="input-div">
              <input
                onChange={handleChange}
                value={data.bookId}
                name="bookId"
                type="text"
                placeholder="Book ID"
                required
              />
            </div>

            <button
              type="submit"
              className="add-borrow-add-button"
              disabled={loading}
            >
              {loading ? "Borrowing..." : "Borrow Book"}
            </button>
          </div>
        </form>
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
        title={"Failed"}
        message={modalMessage}
        isSuccess={false}
      />
    </div>
  );
}

export default ReturnBookPopup;
