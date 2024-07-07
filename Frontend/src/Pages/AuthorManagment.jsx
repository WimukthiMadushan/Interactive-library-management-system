import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Close from "./../Images/close.png";
import "./../Styles/AuthorManagment.css";
import { toast } from "react-toastify";
import User from "./../Images/user.png";

function AuthorManagment() {
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [newData, setNewData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    country: "",
    nic: "",
    phone: "",
  });

  const [updateData, setUpdateData] = useState({
    Author_ID: "",
    First_Name: "",
    Last_Name: "",
    Email: "",
    Address: "",
    Mobile: "",
    NIC: "",
  });

  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const authorsPerPage = 10; // Set the number of authors per page
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      fetchAuthor();
    }
  }, [id]);

  const fetchAuthor = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/author/${id}`
      );
      setUpdateData(response.data);
    } catch (error) {
      console.error("Error fetching author:", error);
    }
  };

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/author/");
        setAuthors(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching authors:", error);
      }
    };
    fetchAuthors();
  }, [searchQuery]);

  const handleNewDataChange = (event) => {
    const { name, value } = event.target;
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    //console.log(newData);
    const address = `${newData.street}, ${newData.city}, ${newData.country}.`;

    const formNewDataObject = {
      First_Name: newData.firstName,
      Last_Name: newData.lastName,
      Email: newData.email,
      Address: address,
      Mobile: newData.phone,
      NIC: newData.nic,
    };

    try {
      const response = await axios.post(
        `http://localhost:5000/api/author/`,
        formNewDataObject
      );
      if (response.status === 201) {
        setNewData({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          country: "",
          nic: "",
          phone: "",
        });
        toast.success("Author added successfully!");
        setIsAddPopupOpen(false);
      } else {
        toast.error("Failed to add author");
      }
    } catch (error) {
      console.error("Error adding author:", error);
      toast.error("Error adding author");
    }
  };
  const handleUpdateDataChange = (event) => {
    const { name, value } = event.target;
    setUpdateData((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    //console.log(updateData);

    try {
      const response = await axios.put(
        `http://localhost:5000/api/author/${id}`,
        updateData
      );
      if (response.status === 200) {
        toast.success("Author updated successfully!");
        setIsUpdatePopupOpen(false);
      } else {
        toast.error("Failed to update author");
      }
    } catch (error) {
      console.error("Error updating author:", error);
      toast.error("Error updating author");
    }
  };

  const toggleAddPopup = () => {
    setIsAddPopupOpen(!isAddPopupOpen);
  };

  const toggleUpdatePopup = () => {
    setIsUpdatePopupOpen(!isUpdatePopupOpen);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredAuthors = authors.filter(
    (author) =>
      author.First_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.Last_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(
    indexOfFirstAuthor,
    indexOfLastAuthor
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="author-managment-container">
      <div className="author-managment-left">
        <div className="author-managment-image">
          <img src={User} alt="" />
          <h2>Author Details</h2>
        </div>
        <div className="author-managment-buttons">
          <button className="add-author-button" onClick={toggleAddPopup}>
            Add Author
          </button>
          <button className="update-author-button" onClick={toggleUpdatePopup}>
            Update Author
          </button>
        </div>
      </div>
      <div className="author-managment-right">
        <div className="author-managment-search">
          <input
            type="text"
            placeholder="Search Author"
            className="search-author"
            value={searchQuery}
            onChange={handleSearchChange}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredAuthors.length / authorsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`pagination-button ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>

      {isAddPopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <form className="container" onSubmit={handleAddSubmit}>
              <div className="add">
                <h1>Add Author</h1>
                <div className="multi-fields">
                  <input
                    onChange={handleNewDataChange}
                    value={newData.firstName}
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                  <input
                    onChange={handleNewDataChange}
                    value={newData.lastName}
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </div>
                <input
                  onChange={handleNewDataChange}
                  value={newData.email}
                  name="email"
                  type="email"
                  placeholder="Email address"
                  required
                />
                <h3>Address Details</h3>
                <input
                  onChange={handleNewDataChange}
                  value={newData.street}
                  name="street"
                  type="text"
                  placeholder="Street"
                  required
                />
                <div className="multi-fields">
                  <input
                    onChange={handleNewDataChange}
                    value={newData.city}
                    name="city"
                    type="text"
                    placeholder="City"
                    required
                  />
                  <input
                    onChange={handleNewDataChange}
                    value={newData.country}
                    name="country"
                    type="text"
                    placeholder="Country"
                    required
                  />
                </div>
                <div className="multi-fields">
                  <input
                    onChange={handleNewDataChange}
                    value={newData.nic}
                    name="nic"
                    type="text"
                    placeholder="NIC Number"
                    required
                  />
                  <input
                    onChange={handleNewDataChange}
                    value={newData.phone}
                    name="phone"
                    type="text"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <button type="submit" className="add-button">
                  Add Author
                </button>
              </div>
            </form>
            <button className="close-button" onClick={toggleAddPopup}>
              <img src={Close} alt="Close" />
            </button>
          </div>
        </div>
      )}
      {isUpdatePopupOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <form className="container" onSubmit={handleUpdateSubmit}>
              <div className="update">
                <h1>Update Author</h1>
                <div className="input-div">
                  <label>
                    Author ID:
                    <input
                      onChange={handleUpdateDataChange}
                      value={updateData.Author_ID}
                      name="Author_ID"
                      type="text"
                      placeholder="Author ID"
                    />
                  </label>
                </div>
                <div className="multi-fields">
                  <label>
                    First Name:
                    <input
                      onChange={handleUpdateDataChange}
                      value={updateData.First_Name}
                      name="First_Name"
                      type="text"
                      placeholder="First Name"
                    />
                  </label>
                  <label>
                    Last Name:
                    <input
                      onChange={handleUpdateDataChange}
                      value={updateData.Last_Name}
                      name="Last_Name"
                      type="text"
                      placeholder="Last Name"
                    />
                  </label>
                </div>
                <div className="input-div">
                  <label>
                    Email:
                    <input
                      onChange={handleUpdateDataChange}
                      value={updateData.Email}
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
                      onChange={handleUpdateDataChange}
                      value={updateData.Address}
                      name="Address"
                      type="text"
                      placeholder="Address"
                    />
                  </label>
                </div>
                <div className="multi-fields">
                  <label>
                    Mobile:
                    <input
                      onChange={handleUpdateDataChange}
                      value={updateData.Mobile}
                      name="Mobile"
                      type="text"
                      placeholder="Mobile"
                    />
                  </label>
                  <label>
                    NIC:
                    <input
                      onChange={handleUpdateDataChange}
                      value={updateData.NIC}
                      name="NIC"
                      type="text"
                      placeholder="NIC"
                    />
                  </label>
                </div>
                <button type="submit" className="update-button">
                  Update Author
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
}

export default AuthorManagment;
