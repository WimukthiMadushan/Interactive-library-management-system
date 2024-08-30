import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginationButtons from "../../Components/Pagination/PaginationButtons/PaginationButtons";
import "./AuthorManagment.css";
import AddAuthorPopup from "./../../Components/Popup/AddAuthorPopup/AddAuthorPopup";
import UpdateAuthorPopup from "./../../Components/Popup/UpdataAuthorPopup/UpdateAuthorPopup";
import NotificationModal from "../../Components/Modals/NotificationModal";

function AuthorManagment() {
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false);
  const [isUpdateAuthorOpen, setIsUpdateAuthorOpen] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

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

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/author/${id}`);
      setModalMessage("Author Deleted Successfully.");
      setShowSuccess(true);
      fetchAuthors();
    } catch (error) {
      setModalMessage("Error Deleting Author.");
      setShowError(true);
      console.error("Error deleting author:", error);
    }
  };

  const filteredAuthors = authors.filter(
    (author) =>
      author.First_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.Last_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const authorsPerPage = 10;
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(
    indexOfFirstAuthor,
    indexOfLastAuthor
  );
  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);

  return (
    <div className="author-managment-outer">
      <div className="author-managment-container">
        <h2>Author Management</h2>
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
          <AddAuthorPopup
            toggleAddAuthorPopup={toggleAddAuthorPopup}
            fetchAuthors={fetchAuthors}
          />
        )}
        {isUpdateAuthorOpen && (
          <UpdateAuthorPopup
            toggleUpdateAuthorPopup={toggleUpdateAuthorPopup}
            fetchAuthors={fetchAuthors}
            authorId={selectedAuthorId}
          />
        )}
        <NotificationModal
          show={showSuccess}
          handleClose={handleCloseSuccess}
          title={"sucess"}
          message={modalMessage}
          isSuccess={true}
        />
        <NotificationModal
          show={showError}
          handleClose={handleCloseError}
          title={"failed"}
          message={modalMessage}
          isSuccess={false}
        />
      </div>
    </div>
  );
}

export default AuthorManagment;
