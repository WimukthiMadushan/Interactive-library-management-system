import React, { useState } from "react";
import axios from "axios";
import NotificationModal from "../Modals/NotificationModal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddBorrows.css";

const AddBorrows = ({ onClose }) => {
  const [data, setData] = useState({
    userId: "",
    bookId: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    const formDataObject = {
      UserID: data.userId,
      Copy_ID: data.bookId,
    };
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:5001/api/borrow`,
        formDataObject
      );
      setData({
        userId: "",
        bookId: "",
      });
      setModalMessage(response.data.message);
      setShowSuccess(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      setModalMessage(error.response.data.message);
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="add-borrow-popup-container" data-testid="add-borrow-popup-container">
        <div className="add-borrow-popup">
          <button
            className="close-button"
            onClick={onClose}
            data-testid="close-button"
          >
            &times;
          </button>
          <form
            className="add-borrow-container"
            onSubmit={onSubmitHandler}
            data-testid="borrow-form"
          >
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
                  data-testid="user-id-input"
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
                  data-testid="book-id-input"
                />
              </div>

              <button
                type="submit"
                className="add-borrow-add-button"
                disabled={loading}
                data-testid="submit-button"
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
    </>
  );
};

export default AddBorrows;
