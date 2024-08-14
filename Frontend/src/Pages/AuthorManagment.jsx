import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "./../Images/user.png";
import Close from "./../Images/close.png";
import PaginationButtons from "../Components/PaginationButtons";
import "./../Styles/AuthorManagment.css";
import DeleteModal from "../Components/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AuthorManagment() {
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false);
  const [isUpdateAuthorOpen, setIsUpdateAuthorOpen] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [authorIdToDelete, setAuthorIdToDelete] = useState(null);
  const [newData, setNewData] = useState({
    First_Name: "",
    Last_Name: "",
    Email: "",
    Street: "",
    City: "",
    Country: "",
    NIC: "",
    Mobile: "",
  });

  useEffect(() => {
    fetchAuthors();
  }, [searchQuery]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/author/");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    //console.log(newData);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/author/",
        newData
      );
      if (response.status === 201) {
        setIsAddAuthorOpen(false);
        fetchAuthors();
        setNewData({
          First_Name: "",
          Last_Name: "",
          Email: "",
          Street: "",
          City: "",
          Country: "",
          NIC: "",
          Mobile: "",
        });
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error adding author:", error);
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    const { First_Name, Last_Name, Email, Street, City, Country, NIC, Mobile } =
      newData;
    const updateData = {
      First_Name: First_Name,
      Last_Name: Last_Name,
      Email: Email,
      Address: `${Street}, ${City}, ${Country}`,
      NIC: NIC,
      Mobile: Mobile,
    };
    try {
      const response = await axios.put(
        `http://localhost:5000/api/author/${selectedAuthorId}`,
        updateData
      );
      if (response.status === 200) {
        setIsUpdateAuthorOpen(false);
        fetchAuthors();
      } else {
        toast.error("Failed to update author");
      }
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleAddAuthorPopup = () => {
    setIsAddAuthorOpen(!isAddAuthorOpen);
  };

  const toggleUpdateAuthorPopup = (authorId) => {
    setIsUpdateAuthorOpen(!isUpdateAuthorOpen);
    setSelectedAuthorId(authorId);
  };

  const handleNewDataChange = (event) => {
    const { name, value } = event.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const handleUpdateDataChange = (event) => {
    const { name, value } = event.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  const filteredAuthors = authors.filter(
    (author) =>
      author.First_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.Last_Name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  const authorsPerPage = 10;
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(
    indexOfFirstAuthor,
    indexOfLastAuthor
  );
  const totalPages = Math.ceil(authors.length / authorsPerPage);

  const handleDelete = (id) => {
    setAuthorIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/author/${authorIdToDelete}`
      );
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.Author_ID !== authorIdToDelete)
      );
      toast.success("Author deleted successfully.");
    } catch (error) {
      toast.error("Failed to delete author. Please try again.");
    } finally {
      setShowModal(false);
      setAuthorIdToDelete(null);
    }
  };

  return (
    <div className="author-managment-container">
      <div className="author-managment-image">
        <img src={User} alt="User Icon" />
      </div>
      <h2 style={{ textAlign: "center" }}>Author Management</h2>
      <div className="author-managment-buttons">
        <button className="add-author-button" onClick={toggleAddAuthorPopup}>
          Add Author
        </button>
      </div>
      <div className="author-managment-search">
        <input
          type="text"
          placeholder="Search authors..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-author"
        />
      </div>
      <div className="authors-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Mobile</th>
              <th>NIC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentAuthors.map((author) => (
              <tr key={author.Author_ID}>
                <td>{author.Author_ID}</td>
                <td>{author.First_Name}</td>
                <td>{author.Last_Name}</td>
                <td>{author.Email}</td>
                <td>{author.Address}</td>
                <td>{author.Mobile}</td>
                <td>{author.NIC}</td>
                <td className="action-column">
                  <button
                    className="update-author-button"
                    onClick={() => toggleUpdateAuthorPopup(author.Author_ID)}
                  >
                    Update
                  </button>
                  <button
                    className="delete-author-button"
                    onClick={() => handleDelete(author.Author_ID)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {isAddAuthorOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <form onSubmit={handleAddSubmit}>
              <div className="container">
                <h1>Add Author</h1>
                <div className="multi-fields">
                  <input
                    type="text"
                    value={newData.First_Name}
                    onChange={handleNewDataChange}
                    name="First_Name"
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    value={newData.Last_Name}
                    onChange={handleNewDataChange}
                    name="Last_Name"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="multi-fields">
                  <input
                    type="Email"
                    value={newData.Email}
                    onChange={handleNewDataChange}
                    name="Email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    value={newData.Street}
                    onChange={handleNewDataChange}
                    name="Street"
                    placeholder="Street"
                    required
                  />
                </div>
                <div className="multi-fields">
                  <input
                    type="text"
                    value={newData.City}
                    onChange={handleNewDataChange}
                    name="City"
                    placeholder="City"
                    required
                  />
                  <input
                    type="text"
                    value={newData.Country}
                    onChange={handleNewDataChange}
                    name="Country"
                    placeholder="Country"
                    required
                  />
                </div>
                <div className="multi-fields">
                  <input
                    type="text"
                    value={newData.NIC}
                    onChange={handleNewDataChange}
                    name="NIC"
                    placeholder="NIC Number"
                    required
                  />
                  <input
                    type="text"
                    value={newData.Mobile}
                    onChange={handleNewDataChange}
                    name="Mobile"
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <button type="submit" className="add-button">
                  Add Author
                </button>
              </div>
            </form>
            <button className="close-button" onClick={toggleAddAuthorPopup}>
              <img src={Close} alt="Close" />
            </button>
          </div>
        </div>
      )}

      {isUpdateAuthorOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <form onSubmit={handleUpdateSubmit}>
              <div className="container">
                <h1>Update Author</h1>
                <div className="multi-fields">
                  <input
                    type="text"
                    value={newData.First_Name}
                    onChange={handleUpdateDataChange}
                    name="First_Name"
                    placeholder="First Name"
                    required
                  />
                  <input
                    type="text"
                    value={newData.Last_Name}
                    onChange={handleUpdateDataChange}
                    name="Last_Name"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <div className="multi-fields">
                  <input
                    type="Email"
                    value={newData.Email}
                    onChange={handleUpdateDataChange}
                    name="Email"
                    placeholder="Email"
                    required
                  />
                  <input
                    type="text"
                    value={newData.Street}
                    onChange={handleUpdateDataChange}
                    name="Street"
                    placeholder="Street"
                    required
                  />
                </div>
                <div className="multi-fields">
                  <input
                    type="text"
                    value={newData.City}
                    onChange={handleUpdateDataChange}
                    name="City"
                    placeholder="City"
                    required
                  />
                  <input
                    type="text"
                    value={newData.Country}
                    onChange={handleUpdateDataChange}
                    name="Country"
                    placeholder="Country"
                    required
                  />
                </div>
                <div className="multi-fields">
                  <input
                    type="text"
                    value={newData.NIC}
                    onChange={handleUpdateDataChange}
                    name="NIC"
                    placeholder="NIC Number"
                    required
                  />
                  <input
                    type="text"
                    value={newData.Mobile}
                    onChange={handleUpdateDataChange}
                    name="Mobile"
                    placeholder="Mobile Number"
                    required
                  />
                </div>
                <button type="submit" className="update-button">
                  Update Author
                </button>
              </div>
            </form>
            <button className="close-button" onClick={toggleUpdateAuthorPopup}>
              <img src={Close} alt="Close" />
            </button>
          </div>
        </div>
      )}
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        value={"author"}
      />
      <ToastContainer />
    </div>
  );
}

export default AuthorManagment;
