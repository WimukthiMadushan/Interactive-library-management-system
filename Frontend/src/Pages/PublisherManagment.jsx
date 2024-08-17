import React, { useState, useEffect } from "react";
import "./../Styles/PublisherManagment.css";
import { MdClose } from "react-icons/md";

import axios from "axios";
import PaginationButtons from "../Components/PaginationButtons";
import DeleteModal from "../Components/Modals/DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PublisherManagement = () => {
  const [publishers, setPublishers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPublisherData, setNewPublisherData] = useState({
    Publisher_ID: "",
    Publisher_First_Name: "",
    Publisher_Last_Name: "",
    Email: "",
    Address: "",
    Mobile: "",
  });
  const [updatePublisherData, setUpdatePublisherData] = useState({
    Publisher_ID: "",
    Publisher_First_Name: "",
    Publisher_Last_Name: "",
    Email: "",
    Address: "",
    Mobile: "",
  });
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [publisherIdToDelete, setPublisherIdToDelete] = useState(null);
  const [publishersPerPage] = useState(10);

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

  const handleAddPublisherDataChange = (e) => {
    const { name, value } = e.target;
    setNewPublisherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdatePublisherDataChange = (e) => {
    const { name, value } = e.target;
    setUpdatePublisherData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    const formDataObject = {
      Publisher_First_Name: newPublisherData.Publisher_First_Name,
      Publisher_Last_Name: newPublisherData.Publisher_Last_Name,
      Email: newPublisherData.Email,
      Address: newPublisherData.Address,
      Mobile: newPublisherData.Mobile,
    };
    try {
      const response = await axios.post(
        `http://localhost:5000/api/publisher`,
        formDataObject
      );
      if (response.status === 201) {
        setNewPublisherData({
          Publisher_First_Name: "",
          Publisher_Last_Name: "",
          Email: "",
          Address: "",
          Mobile: "",
        });
        console.log(response.data);
        setPublishers((prevPublishers) => [...prevPublishers, response.data]);
        setAddPopupOpen(false);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const fetchPublisherById = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/publisher/${id}`
      );
      setUpdatePublisherData(response.data);
    } catch (error) {
      console.error("Error fetching publisher:", error);
    }
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/publisher/${updatePublisherData.Publisher_ID}`,
        updatePublisherData
      );
      setPublishers((prevPublishers) =>
        prevPublishers.map((publisher) =>
          publisher.Publisher_ID === updatePublisherData.Publisher_ID
            ? updatePublisherData
            : publisher
        )
      );
      setUpdatePopupOpen(false);
    } catch (error) {
      console.error("Error updating publisher:", error);
    }
  };

  const handleDeletePublisher = (id) => {
    setPublisherIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/publisher/${publisherIdToDelete}`
      );
      if (response.status === 200) {
        toast.success("Publisher deleted successfully.");
        setPublishers((prevPublishers) =>
          prevPublishers.filter(
            (publisher) => publisher.Publisher_ID !== publisherIdToDelete
          )
        );
      } else {
        console.log("error");
      }
    } catch (error) {
      toast.error("Failed to delete publisher. Please try again.");
    } finally {
      setShowModal(false);
      setPublisherIdToDelete(null);
    }
  };

  const toggleAddPopup = () => {
    setAddPopupOpen(!isAddPopupOpen);
  };

  const toggleUpdatePopup = () => {
    setUpdatePopupOpen(!isUpdatePopupOpen);
  };

  // Filtering publishers based on search query
  const filteredPublishers = publishers.filter((publisher) => {
    const Publisher_First_Name = publisher.Publisher_First_Name
      ? publisher.Publisher_First_Name.toLowerCase()
      : "";
    const Publisher_Last_Name = publisher.Publisher_Last_Name
      ? publisher.Publisher_Last_Name.toLowerCase()
      : "";

    return (
      Publisher_First_Name.includes(searchQuery.toLowerCase()) ||
      Publisher_Last_Name.includes(searchQuery.toLowerCase())
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
                      onClick={() => {
                        fetchPublisherById(publisher.Publisher_ID);
                        toggleUpdatePopup();
                      }}
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
        <div className="popup-overlay">
          <div className="popup add-publisher-popup-container">
            <form className="container" onSubmit={handleAddSubmit}>
              <div className="add">
                <h1>Add Publisher</h1>
                <button className="close-button" onClick={toggleAddPopup}>
                  <MdClose />
                </button>
                <div className="multi-fields">
                  <input
                    onChange={handleAddPublisherDataChange}
                    value={newPublisherData.Publisher_First_Name}
                    name="Publisher_First_Name"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                  <input
                    onChange={handleAddPublisherDataChange}
                    value={newPublisherData.Publisher_Last_Name}
                    name="Publisher_Last_Name"
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <input
                  onChange={handleAddPublisherDataChange}
                  value={newPublisherData.Email}
                  name="Email"
                  type="Email"
                  placeholder="Email address"
                  required
                />
                <input
                  onChange={handleAddPublisherDataChange}
                  value={newPublisherData.Address}
                  name="Address"
                  type="text"
                  placeholder="Address"
                  required
                />
                <input
                  onChange={handleAddPublisherDataChange}
                  value={newPublisherData.Mobile}
                  name="Mobile"
                  type="text"
                  placeholder="Mobile Number"
                  required
                />
                <button type="submit" className="add-button">
                  Add Publisher
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Update Publisher Popup */}
      {isUpdatePopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <form className="container" onSubmit={handleUpdateSubmit}>
              <div className="update">
                <h1>Update Publisher</h1>
                <div className="input-div">
                  <label>
                    Publisher ID:
                    <input
                      onChange={handleUpdatePublisherDataChange}
                      value={updatePublisherData.Publisher_ID}
                      name="Publisher_ID"
                      type="text"
                      placeholder="Publisher ID"
                      readOnly
                    />
                  </label>
                </div>
                <div className="multi-fields">
                  <label>
                    First Name:
                    <input
                      onChange={handleUpdatePublisherDataChange}
                      value={updatePublisherData.Publisher_First_Name}
                      name="Publisher_First_Name"
                      type="text"
                      placeholder="First Name"
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      onChange={handleUpdatePublisherDataChange}
                      value={updatePublisherData.Publisher_Last_Name}
                      name="Publisher_Last_Name"
                      type="text"
                      placeholder="Last Name"
                    />
                  </label>
                </div>
                <div className="input-div">
                  <label>
                    Email:
                    <input
                      onChange={handleUpdatePublisherDataChange}
                      value={updatePublisherData.Email}
                      name="Email"
                      type="Email"
                      placeholder="Email address"
                    />
                  </label>
                </div>
                <div className="input-div">
                  <label>
                    Address:
                    <input
                      onChange={handleUpdatePublisherDataChange}
                      value={updatePublisherData.Address}
                      name="Address"
                      type="text"
                      placeholder="Address"
                    />
                  </label>
                </div>
                <div className="input-div">
                  <label>
                    Mobile Number:
                    <input
                      onChange={handleUpdatePublisherDataChange}
                      value={updatePublisherData.Mobile}
                      name="Mobile"
                      type="text"
                      placeholder="Mobile Number"
                    />
                  </label>
                </div>
                <button type="submit" className="update-button">
                  Update Publisher
                </button>
              </div>
            </form>
            <button className="close-button" onClick={toggleUpdatePopup}>
              <MdClose />
            </button>
          </div>
        </div>
      )}
      <DeleteModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleConfirmDelete}
        value={"publisher"}
      />
      <ToastContainer />
    </div>
  );
};

export default PublisherManagement;
