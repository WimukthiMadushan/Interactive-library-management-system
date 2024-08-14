import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import "./../Styles/AddBorrows.css";
import Close from "./../Images/close.png";

const AddBorrows = ({ onClose }) => {
  const [data, setData] = useState({
    userId: "",
    bookId: "",
  });

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
        //console.log(response.data);
        onClose();
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
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

            <button type="submit" className="add-button">
              Borrow Book
            </button>
            <button
              type="button"
              className="close-button"
              onClick={onClose}
              style={{ position: "absolute", top: "-2rem" }}
            >
              <img src={Close} alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBorrows;
