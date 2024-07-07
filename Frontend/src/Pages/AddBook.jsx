import React, { useState } from "react";
import AuthorModal from "./../Components/AuthorModal";
import PublisherModal from "./../Components/PublisherModal";
import "./../Styles/AddBook.css";

function AddBook() {
  // State for book details
  const [bookDetails, setBookDetails] = useState({
    ISBN_Number: "",
    Title: "",
    Author: "",
    Description: "",
    Language: "",
    Published_Date: "",
    Category: "",
    Publisher: "",
  });

  // State for dropdowns
  const [authors, setAuthors] = useState(["Author 1", "Author 2"]);
  const [publishers, setPublishers] = useState(["Publisher 1", "Publisher 2"]);

  // State for showing modals
  const [showAuthorModal, setShowAuthorModal] = useState(false);
  const [showPublisherModal, setShowPublisherModal] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  // Handle adding new author
  const handleAddAuthor = (newAuthor) => {
    console.log(newAuthor);
    const fullName = `${newAuthor.First_Name} ${newAuthor.Last_Name}`;
    setAuthors([...authors, fullName]);
    //pass the data to the backend
    setShowAuthorModal(false);
  };

  // Handle adding new publisher
  const handleAddPublisher = (newPublisher) => {
    const fullName = `${newPublisher.Publisher_First_Name} ${newPublisher.Publisher_Last_Name}`;
    setPublishers([...publishers, fullName]);
    setShowPublisherModal(false);
  };

  return (
    <div className="addbook-container">
      <h2>Add New Book.</h2>
      <form className="addbook-form">
        <label>
          ISBN Number:
          <input
            type="text"
            name="ISBN_Number"
            value={bookDetails.ISBN_Number}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            name="Title"
            value={bookDetails.Title}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Author:
          <select
            name="Author"
            value={bookDetails.Author}
            onChange={handleInputChange}
          >
            <option value="">Select Author</option>
            {authors.map((author, index) => (
              <option key={index} value={author}>
                {author}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="add-new-button"
            onClick={() => setShowAuthorModal(true)}
          >
            Add New Author
          </button>
        </label>
        <label>
          Description:
          <textarea
            name="Description"
            value={bookDetails.Description}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Language:
          <input
            type="text"
            name="Language"
            value={bookDetails.Language}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Published Date:
          <input
            type="date"
            name="Published_Date"
            value={bookDetails.Published_Date}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="Category"
            value={bookDetails.Category}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Publisher:
          <select
            name="Publisher"
            value={bookDetails.Publisher}
            onChange={handleInputChange}
          >
            <option value="">Select Publisher</option>
            {publishers.map((publisher, index) => (
              <option key={index} value={publisher}>
                {publisher}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="add-new-button"
            onClick={() => setShowPublisherModal(true)}
          >
            Add New Publisher
          </button>
        </label>
        <button type="submit" className="submit-button">
          Add Book
        </button>
      </form>

      {/* Modals for adding author and publisher */}
      {showAuthorModal && (
        <AuthorModal
          onClose={() => setShowAuthorModal(false)}
          onSave={handleAddAuthor}
        />
      )}
      {showPublisherModal && (
        <PublisherModal
          onClose={() => setShowPublisherModal(false)}
          onSave={handleAddPublisher}
        />
      )}
    </div>
  );
}

export default AddBook;
