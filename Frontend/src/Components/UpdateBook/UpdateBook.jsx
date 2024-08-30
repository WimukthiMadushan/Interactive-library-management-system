import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DatePicker } from "rsuite";
import Select from "react-select";
import "rsuite/DatePicker/styles/index.css";
import "./../../Components/Popup/AddBookPopup/AddBooks.css";
import upload_area from "./../../Images/upload_area.png";
import { MdClose } from "react-icons/md";
import { StoreContext } from "./../../Hooks/StoreContext";
import { Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateBook = ({ id, togglePopup }) => {
  const { publisherOptions, authorOptions, categoryOptions } =
    useContext(StoreContext);

  const [image, setImage] = useState(null);
  const [book, setBook] = useState({
    Book_ID: "",
    ISBN_Number: "",
    Title: "",
    Author: "",
    Description: "",
    Published_Date: "",
    Image_Path: "",
    Publisher: "",
    Category: "",
  });

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageContent, setMessageContent] = useState("");
  const [messageType, setMessageType] = useState(""); // "success" or "error"

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/book/${id}`
        );
        setBook(response.data);
      } catch (error) {
        setMessageContent("Error fetching book details.");
        setMessageType("error");
        setShowMessageModal(true);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: selectedOption.value,
    }));
  };

  const handleDateChange = (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    setBook((prevBook) => ({
      ...prevBook,
      Published_Date: formattedDate,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Book_ID", book.Book_ID);
    formData.append("ISBN_Number", book.ISBN_Number);
    formData.append("Title", book.Title);
    formData.append("Author", book.Author);
    formData.append("Description", book.Description);
    formData.append("Published_Date", book.Published_Date);
    formData.append("Image_Path", book.Image_Path); // Ensure this matches server expectation
    formData.append("Publisher", book.Publisher);
    formData.append("Category", book.Category);
    if (image) {
      formData.append("uploaded_file", image);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/book/${id}`,
        formData
      );
      setMessageContent("Book updated successfully.");
      setMessageType("success");
    } catch (error) {
      console.error("Error updating book:", error);
      setMessageContent("Failed to update book. Please try again.");
      setMessageType("error");
    } finally {
      setShowMessageModal(true);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup" style={{ width: "800px", overflow: "visible" }}>
        <form
          className="container"
          onSubmit={handleSubmit}
          style={{ width: "740px" }}
        >
          <div className="add-books">
            <h1>Update Book</h1>
            <button className="add-books-close-button" onClick={togglePopup}>
              <MdClose />
            </button>
            <div className="add-img-upload flex-col">
              <p>Upload Book Image</p>
              <label htmlFor="uploaded_file">
                <img
                  src={image ? URL.createObjectURL(image) : upload_area}
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
                value={book.Title}
                name="Title"
                type="text"
                placeholder="Book Title"
                required
              />
              <input
                onChange={handleChange}
                value={book.ISBN_Number}
                name="ISBN_Number"
                type="text"
                placeholder="ISBN Number"
                required
              />
            </div>

            <textarea
              onChange={handleChange}
              value={book.Description}
              name="Description"
              rows="5"
              placeholder="Write description here"
              required
            />

            <div className="multi-select">
              <Select
                className="select"
                options={authorOptions}
                onChange={(option) =>
                  handleSelectChange(option, { name: "Author" })
                }
                value={authorOptions.find(
                  (option) => option.value === book.Author
                )}
                placeholder="Select Author"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "gray",
                    primary: "black",
                  },
                })}
              />

              <Select
                className="select"
                options={publisherOptions}
                onChange={(option) =>
                  handleSelectChange(option, { name: "Publisher" })
                }
                value={publisherOptions.find(
                  (option) => option.value === book.Publisher
                )}
                placeholder="Select Publisher"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "gray",
                    primary: "black",
                  },
                })}
              />

              <Select
                className="select"
                options={categoryOptions}
                onChange={(option) =>
                  handleSelectChange(option, { name: "Category" })
                }
                value={categoryOptions.find(
                  (option) => option.value === book.Category
                )}
                placeholder="Select Category"
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "gray",
                    primary: "black",
                  },
                })}
              />
            </div>

            <DatePicker
              className="date"
              value={new Date(book.Published_Date)}
              onChange={handleDateChange}
              name="pdate"
              appearance="default"
              placeholder="Published Date"
              size="lg"
              required
            />

            <button type="submit" className="add-button">
              Update Book
            </button>
          </div>
        </form>
      </div>

      {/* Message Modal */}
      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {messageType === "success" ? "Success" : "Error"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{messageContent}</Modal.Body>
        <Modal.Footer>
          <Button
            variant={messageType === "sucess" ? "primary" : "danger"}
            onClick={() => setShowMessageModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdateBook;
