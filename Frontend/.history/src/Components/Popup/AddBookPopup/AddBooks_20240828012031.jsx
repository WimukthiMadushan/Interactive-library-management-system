import React, { useState, useContext } from "react";
import { MdClose } from "react-icons/md";
import { StoreContext } from "./../../../Hooks/StoreContext";
import axios from "axios";
import "./AddBooks.css";
import NotificationModal from "../../Modals/NotificationModal";
5001
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
        "http://localhost:5001/api/book",
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
      <div className="popup-overlay">
        <div className="popup" style={{ width: "800px", overflow: "visible" }}>
          <form
            className="container"
            onSubmit={onSubmitHandler}
            style={{ width: "740px" }}
          >
            <div className="add-books">
              <h1>Add Books</h1>
              <button className="add-books-close-button" onClick={togglePopup}>
                <MdClose />
              </button>

              <div className="add-img-upload flex-col">
                <p>Upload Book Image</p>
                <label htmlFor="uploaded_file">
                  <img
                    src={
                      image ? URL.createObjectURL(image) : "default_image_url"
                    }
                    alt="Upload Area"
                  />
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
                onChange={handleChange}
                value={data.description}
                name="description"
                rows="5"
                placeholder="Write description here"
                required
              />

              <div className="multi-select">
                <select
                  name="author"
                  onChange={handleChange}
                  value={data.author}
                  className="select"
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
                  className="select"
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
                  className="select"
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

              <button type="submit" className="add-button">
                Add Book
              </button>
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
