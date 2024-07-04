import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewAuthors.css';

const ViewAuthors = ({url}) => {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState([]);

  // Fetch the data from the backend
  const fetchAuthors = async () => {
    try {
      const response = await axios.get(`${url}/api/author`); 
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    useEffect(() => {
      fetchAuthors();
    }, []);


  return (
    <div className="view-authors-container">
      <h1>Authors</h1>
      <table className="authors-table">
        <thead>
          <tr>
            <th>Author ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>NIC</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {authors.map((author) => (
            <tr key={author.Author_ID}>
              <td>{author.Author_ID}</td>
              <td>{author.First_Name}</td>
              <td>{author.Last_Name}</td>
              <td>{author.Email}</td>
              <td>{author.Address}</td>
              <td>{author.Mobile}</td>
              <td>{author.NIC}</td>
              <td className="action-column">
                <button className="action-button update-button"  onClick={() => navigate(`/updateauthor/${author.Author_ID}`)}>
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default ViewAuthors

{/* <button className="action-button delete-button" onClick={() => handleDelete(author.Author_ID)}>
                  Delete
                </button> */}
// onClick={() => navigate(`/updatebook/${book.Book_ID}`)}