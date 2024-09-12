import React, { useState, useEffect } from "react";
import "./PublisherManagment.css";
import axios from "axios";
import PaginationButtons from "../../Components/Pagination/PaginationButtons/PaginationButtons";
import AddPublisherPopup from "../../Components/Popup/AddPublisherPopup/AddPublisherPopup";
import UpdatePublisherPopup from "./../../Components/Popup/UpdatePublisherpopup/UpdatePublisherPopup";
import NotificationModal from "../../Components/Modals/NotificationModal";

const PublisherManagement = () => {
  const [publishers, setPublishers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [currentPublisherId, setCurrentPublisherId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [publishersPerPage] = useState(10);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  useEffect(() => {
    fetchPublishers();
  }, [searchQuery]);

  const fetchPublishers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/publisher");
      setPublishers(response.data);
    } catch (error) {
      console.error("Error fetching publishers:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeletePublisher = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/publisher/${id}`
      );
      setPublishers((prevPublishers) =>
        prevPublishers.filter((publisher) => publisher.Publisher_ID !== id)
      );
      setModalMessage("Publisher Deleted Successfully.");
      setShowSuccess(true);
    } catch (error) {
      console.error("Error deleting publisher:", error);
      setModalMessage("Failed to Delete Publisher.");
      setShowError(true);
    }
  };

  const toggleAddPopup = () => {
    setAddPopupOpen(!isAddPopupOpen);
  };

  const toggleUpdatePopup = (id = null) => {
    setCurrentPublisherId(id);
    setUpdatePopupOpen(!isUpdatePopupOpen);
  };

  // Filter publishers from search box
  const filteredPublishers = publishers.filter((publisher) => {
    const firstName = publisher.Publisher_First_Name
      ? publisher.Publisher_First_Name.toLowerCase()
      : "";
    const lastName = publisher.Publisher_Last_Name
      ? publisher.Publisher_Last_Name.toLowerCase()
      : "";

    return (
      firstName.includes(searchQuery.toLowerCase()) ||
      lastName.includes(searchQuery.toLowerCase())
    );
  });

  const indexOfLastPublisher = currentPage * publishersPerPage;
  const indexOfFirstPublisher = indexOfLastPublisher - publishersPerPage;
  const currentPublishers = filteredPublishers.slice(
    indexOfFirstPublisher,
    indexOfLastPublisher
  );
  const totalPages = Math.ceil(filteredPublishers.length / publishersPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="publisher-managment-outer">
      <div className="publisher-management-container">
        <div className="publisher-management-left">
          <div className="publisher-management-image">
            <h2>Publisher Management</h2>
          </div>
          <div className="publisher-management-buttons">
            <button className="add-publisher-button" onClick={toggleAddPopup}>
              Add Publisher
            </button>
          </div>
        </div>
        <div className="publisher-management-right">
          <div className="publisher-management-search">
            <input
              type="text"
              placeholder="Search Publishers"
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-publisher"
            />
          </div>
          <div className="publishers-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Address</th>
                  <th>Mobile</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentPublishers.map((publisher) => (
                  <tr key={publisher.Publisher_ID}>
                    <td>{publisher.Publisher_ID}</td>
                    <td>{publisher.Publisher_First_Name}</td>
                    <td>{publisher.Publisher_Last_Name}</td>
                    <td>{publisher.Email}</td>
                    <td>{publisher.Address}</td>
                    <td>{publisher.Mobile}</td>
                    <td className="action-column">
                      <button
                        className="update-publisher-button"
                        onClick={() =>
                          toggleUpdatePopup(publisher.Publisher_ID)
                        }
                      >
                        Update
                      </button>
                      <button
                        className="delete-publisher-button"
                        onClick={() =>
                          handleDeletePublisher(publisher.Publisher_ID)
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <PaginationButtons
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
        {isAddPopupOpen && (
          <AddPublisherPopup
            toggleAddPopup={toggleAddPopup}
            fetchPublishers={fetchPublishers}
          />
        )}

        {isUpdatePopupOpen && (
          <UpdatePublisherPopup
            toggleUpdatePopup={toggleUpdatePopup}
            fetchPublishers={fetchPublishers}
            publisherId={currentPublisherId}
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
};

export default PublisherManagement;
