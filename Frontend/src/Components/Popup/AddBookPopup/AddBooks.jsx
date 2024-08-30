import React, { useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import { StoreContext } from "./../../../Hooks/StoreContext";
import axios from "axios";
import "./AddBooks.css";
import NotificationModal from "../../Modals/NotificationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function AddBook({ togglePopup }) {
  const { publisherOptions, authorOptions, categoryOptions } =
    useContext(StoreContext);

  const [selectedDate, setSelectedDate] = useState("");
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    isbn: "",
    description: "",
    author: "",
    publisher: "",
    category: "",
    pdate: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
    setData((prevData) => ({ ...prevData, pdate: event.target.value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("ISBN_Number", data.isbn);
    formData.append("Title", data.title);
    formData.append("Author", data.author);
    formData.append("Description", data.description);
    formData.append("Published_Date", data.pdate);
    formData.append("Category", data.category);
    formData.append("Publisher", data.publisher);
    formData.append("uploaded_file", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/book",
        formData
      );
      setModalMessage("Book Added Successfully.");
      setShowSuccess(true);
      setImage(null);
      setData({
        title: "",
        isbn: "",
        description: "",
        author: "",
        publisher: "",
        category: "",
        pdate: "",
      });
    } catch (error) {
      setModalMessage("Failed to add book.");
      setShowError(true);
    }
  };

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  return (
    <>
      <div className="add-book-popup-overlay">
        <div
          className="add-book-popup"
          style={{ width: "750px", overflow: "visible" }}
        >
          <form
            className="add-book-container"
            onSubmit={onSubmitHandler}
            style={{ width: "600px" }}
          >
            <div className="add-books">
              <h1>Add Books</h1>
              <button className="add-books-close-button" onClick={togglePopup}>
                <MdClose />
              </button>

              <div className="add-img-upload flex-col">
                <p className="img-upload-text">Upload Book Image</p>
                <label htmlFor="uploaded_file">
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Uploaded Image"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faCloudArrowUp}
                      size="4x"
                      className="img-upload-icon"
                    />
                  )}
                </label>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  name="uploaded_file"
                  type="file"
                  id="uploaded_file"
                  hidden
                />
              </div>

              <div className="multi-fields">
                <input
                  onChange={handleChange}
                  value={data.title}
                  name="title"
                  type="text"
                  placeholder="Book Title"
                  required
                />
                <input
                  onChange={handleChange}
                  value={data.isbn}
                  name="isbn"
                  type="text"
                  placeholder="ISBN Number"
                  required
                />
              </div>

              <textarea
                className="add-book-textarea"
                onChange={handleChange}
                value={data.description}
                name="description"
                rows="4"
                placeholder="Write description here"
                required
              />

              <div className="add-book-multi-select">
                <select
                  name="author"
                  onChange={handleChange}
                  value={data.author}
                  className="add-book-select"
                >
                  <option value="">Select author</option>
                  {authorOptions.map((author) => (
                    <option key={author.value} value={author.value}>
                      {author.label}
                    </option>
                  ))}
                </select>
                <select
                  name="publisher"
                  onChange={handleChange}
                  value={data.publisher}
                  className="add-book-select"
                >
                  <option value="">Select publisher</option>
                  {publisherOptions.map((publisher) => (
                    <option key={publisher.value} value={publisher.value}>
                      {publisher.label}
                    </option>
                  ))}
                </select>
                <select
                  name="category"
                  onChange={handleChange}
                  value={data.category}
                  className="add-book-select"
                >
                  <option value="">Select category</option>
                  {categoryOptions.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <input
                type="date"
                id="publication-date"
                value={selectedDate}
                onChange={handleDateChange}
                className="input"
                required
              />
              <div className="add-button-container">
                <button type="submit" className="add-book-button">
                  Add Book
                </button>
              </div>
            </div>
          </form>
        </div>
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
    </>
  );
}
