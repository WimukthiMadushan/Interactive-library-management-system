import React, { useState, useEffect } from "react";
import "./../Styles/PublisherManagment.css";
import Close from "./../Images/close.png";
import User from "./../Images/user.png";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // Assuming you are using toast notifications

const PublisherManagement = () => {
  const { id } = useParams();
  const [publishers, setPublishers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPublisherData, setNewPublisherData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    country: "",
    phone: "",
  });
  const [updatePublisherData, setUpdatePublisherData] = useState({
    Publisher_ID: "",
    Publisher_First_Name: "",
    Publisher_Last_Name: "",
    Email: "",
    Address: "",
    Phone: "",
  });
  const [isAddPopupOpen, setAddPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [publishersPerPage] = useState(10); // Adjust as per your needs

  useEffect(() => {
    const fetchPublishers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/publisher/"
        );
        setPublishers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching publishers:", error);
      }
    };
    fetchPublishers();
  }, []);

  useEffect(() => {
    fetchPublisher();
  }, [id]);

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
    const address = `${newPublisherData.street}, ${newPublisherData.city}, ${newPublisherData.country}`;

    const formDataObject = {
      Publisher_First_Name: newPublisherData.firstName,
      Publisher_Last_Name: newPublisherData.lastName,
      Email: newPublisherData.email,
      Address: address,
      Phone: newPublisherData.phone,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/publisher`,
        formDataObject
      );
      if (response.status === 201) {
        setNewPublisherData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          country: "",
          phone: "",
        });
        toast.success(response.data.message);
        // Assuming response.data includes the newly added publisher object
        setPublishers((prevPublishers) => [...prevPublishers, response.data]);
        // Close the popup after adding
        setAddPopupOpen(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const fetchPublisher = async () => {
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
        `http://localhost:5000/api/publisher/${id}`,
        updatePublisherData
      );
      toast.success("Publisher updated successfully");
      setPublishers((prevPublishers) =>
        prevPublishers.map((publisher) =>
          publisher.Publisher_ID === updatePublisherData.Publisher_ID
            ? updatePublisherData
            : publisher
        )
      );
      // Close the popup after updating
      setUpdatePopupOpen(false);
    } catch (error) {
      console.error("Error updating publisher:", error);
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

  // Pagination logic
  const indexOfLastPublisher = currentPage * publishersPerPage;
  const indexOfFirstPublisher = indexOfLastPublisher - publishersPerPage;
  const currentPublishers = filteredPublishers.slice(
    indexOfFirstPublisher,
    indexOfLastPublisher
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="publisher-management-container">
      <div className="publisher-management-left">
        <div className="publisher-management-image">
          <img src={User} alt="Publisher" />
          <h2>Publisher Management</h2>
        </div>
        <div className="publisher-management-buttons">
          <button className="add-publisher-button" onClick={toggleAddPopup}>
            Add Publisher
          </button>
          <button
            className="update-publisher-button"
            onClick={toggleUpdatePopup}
          >
            Update Publisher
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
                <th>Phone</th>
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
                  <td>{publisher.Phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {filteredPublishers.length > publishersPerPage && (
          <div className="pagination">
            <ul className="pagination-list">
              {Array.from(
                {
                  length: Math.ceil(
                    filteredPublishers.length / publishersPerPage
                  ),
                },
                (_, index) => (
                  <li key={index} className="pagination-item">
                    <button
                      onClick={() => paginate(index + 1)}
                      className={`pagination-button ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>
      {/* Add Publisher Popup */}
      {isAddPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <form className="container" onSubmit={handleAddSubmit}>
              <div className="add">
                <h1>Add Publisher</h1>
                <div className="multi-fields">
                  <input
                    onChange={handleAddPublisherDataChange}
                    value={newPublisherData.firstName}
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                  <input
                    onChange={handleAddPublisherDataChange}
                    value={newPublisherData.lastName}
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <input
                  onChange={handleAddPublisherDataChange}
                  value={newPublisherData.email}
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                />
                <h3>Address Details</h3>
                <input
                  onChange={handleAddPublisherDataChange}
                  value={newPublisherData.street}
                  name="street"
                  type="text"
                  placeholder="Street"
                  required
                />
                <div className="multi-fields">
                  <input
                    onChange={handleAddPublisherDataChange}
                    value={newPublisherData.city}
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                  />
                  <input
                    onChange={handleAddPublisherDataChange}
                    value={newPublisherData.country}
                    name="country"
                    type="text"
                    placeholder="Country"
                    required
                  />
                </div>
                <input
                  onChange={handleAddPublisherDataChange}
                  value={newPublisherData.phone}
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  required
                />
                <button type="submit" className="add-button">
                  Add Publisher
                </button>
              </div>
            </form>
            <button className="close-button" onClick={toggleAddPopup}>
              <img src={Close} alt="Close" />
            </button>
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
                      type="email"
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
                    Phone Number:
                    <input
                      onChange={handleUpdatePublisherDataChange}
                      value={updatePublisherData.Phone}
                      name="Phone"
                      type="text"
                      placeholder="Phone Number"
                    />
                  </label>
                </div>
                <button type="submit" className="update-button">
                  Update Publisher
                </button>
              </div>
            </form>
            <button className="close-button" onClick={toggleUpdatePopup}>
              <img src={Close} alt="Close" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublisherManagement;
