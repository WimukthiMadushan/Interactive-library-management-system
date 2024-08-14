import React, { useState, useContext } from "react";
import { DatePicker } from "rsuite";
import Select from "react-select";
import "rsuite/DatePicker/styles/index.css";
import "./../Styles/AddBooks.css";
import upload_area from "./../Images/upload_area.png";
import Close from "./../Images/close.png";
import { StoreContext } from "./../Hooks/StoreContext.jsx";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddBooks = ({ showPopup, togglePopup }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      display: "flex",
      flexDirection: "row-reverse",
      minHeight: "36px",
      height: "36px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      display: "none",

      height: "36px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: "flex",
      padding: "0 0 0 12px",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    placeholder: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    singleValue: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
      lineHeight: "36px",
    }),
    container: (provided) => ({
      ...provided,
      width: "250px", // Set your desired width here
    }),
  };
  const { publisherOptions, authorOptions, categoryOptions } =
    useContext(StoreContext);

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

  const handleChange = (event) => {
    if (event.target) {
      const { name, value } = event.target;
      setData((data) => ({ ...data, [name]: value }));
    } else {
      const { name, value } = event;
      setData((data) => ({ ...data, [name]: value }));
    }
  };

  const authorIdMatch = data.author.match(/^\d+/);
  const authorId = authorIdMatch ? authorIdMatch[0] : "";
  const categoryIdMatch = data.category.match(/^\d+/);
  const categoryId = categoryIdMatch ? categoryIdMatch[0] : "";
  const publisherIdMatch = data.publisher.match(/^\d+/);
  const publisherId = publisherIdMatch ? publisherIdMatch[0] : "";

  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  const formattedDate = formatDate(data.pdate);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("ISBN_Number", data.isbn);
    formData.append("Title", data.title);
    formData.append("Author", Number(authorId));
    formData.append("Description", data.description);
    formData.append("Published_Date", formattedDate);
    formData.append("Category", Number(categoryId));
    formData.append("Publisher", Number(publisherId));
    formData.append("uploaded_file", image);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/book`,
        formData
      );
      if (response.status === 201) {
        toast.success("Book Added Succesfully.");
        setData({
          title: "",
          isbn: "",
          description: "",
          author: "",
          publisher: "",
          category: "",
          pdate: "",
        });
        setImage(null);
        togglePopup();
      } else {
        toast.error("Faild to add book.");
        console.log(error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to add book.");
    }
  };

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
                <img src={Close} alt="Close" />
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
                  required
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
                <Select
                  className="addbook-select"
                  options={[
                    { value: "", label: "Select Author", isDisabled: true },
                    ...authorOptions,
                  ]}
                  onChange={(option) =>
                    handleChange({
                      name: "author",
                      value: option ? option.value : "",
                    })
                  }
                  value={
                    authorOptions.find(
                      (option) => option.value === data.author
                    ) || { value: "", label: "Select Author", isDisabled: true }
                  }
                  placeholder="Select Author"
                  styles={customStyles}
                />
                <Select
                  options={[
                    { value: "", label: "Select Publisher", isDisabled: true },
                    ...publisherOptions,
                  ]}
                  onChange={(option) =>
                    handleChange({
                      name: "publisher",
                      value: option ? option.value : "",
                    })
                  }
                  value={
                    publisherOptions.find(
                      (option) => option.value === data.publisher
                    ) || {
                      value: "",
                      label: "Select Publisher",
                      isDisabled: true,
                    }
                  }
                  placeholder="Select Publisher"
                  styles={customStyles}
                />
                <Select
                  options={[
                    { value: "", label: "Select Category", isDisabled: true },
                    ...categoryOptions,
                  ]}
                  onChange={(option) =>
                    handleChange({
                      name: "category",
                      value: option ? option.value : "",
                    })
                  }
                  value={
                    categoryOptions.find(
                      (option) => option.value === data.category
                    ) || {
                      value: "",
                      label: "Select Category",
                      isDisabled: true,
                    }
                  }
                  placeholder="Select Category"
                  styles={customStyles}
                />
              </div>

              <DatePicker
                className="date-picker"
                selected={data.pdate}
                onChange={(date) =>
                  handleChange({ name: "pdate", value: date })
                }
                name="pdate"
                appearance="default"
                placeholder="Published Date"
                size="lg"
                required
              />

              <button type="submit" className="add-button">
                Add Book
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddBooks;
