import React, { useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../Styles/AddBorrows.css";
import Close from "./../Images/close.png";

const AddBorrows = ({ onClose }) => {
  const [data, setData] = useState({
    userId: "",
    bookId: "",
  });
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

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

    setLoading(true); // Set loading to true when request starts

    try {
      const response = await axios.post(
        `http://localhost:5000/api/borrow`,
        formDataObject
      );

      if (response.data.success) {
        setData({
          userId: "",
          bookId: "",
        });
        onClose();
      } else {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false); // Set loading to false when request finishes
    }
  };

  return (
    <>
      <div className="popup-container">
        <div className="popup">
          <form className="container" onSubmit={onSubmitHandler}>
            <div className="borrow">
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

              <button type="submit" className="add-button" disabled={loading}>
                {loading ? "Borrowing..." : "Borrow Book"}
              </button>
              <button
                type="button"
                className="close-button"
                onClick={onClose}
                style={{ position: "absolute", top: "-2rem" }}
              >
                <img src={Close} alt="Close" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div
        className={`modal fade ${showModal ? "show d-block" : ""}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Book Already Borrowed
              </h5>
            </div>
            <div className="modal-body">
              This book has already been borrowed. Please select a different
              book.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBorrows;
