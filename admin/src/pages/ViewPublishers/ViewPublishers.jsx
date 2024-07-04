import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewPublishers.css';

const ViewPublishers = ({url}) => {
  const navigate = useNavigate();
  const [publishers, setPublishers] = useState([]);

  // Fetch the data from the backend
  const fetchPublishers = async () => {
    try {
      const response = await axios.get(`${url}/api/publisher`); 
      setPublishers(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

    useEffect(() => {
      fetchPublishers();
    }, []);


  return (
    <div className="view-publishers-container">
      <h1>Publishers</h1>
      <table className="publishers-table">
        <thead>
          <tr>
            <th>Publisher ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
            <th>Mobile</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {publishers.map((publisher) => (
            <tr key={publisher.Publisher_ID}>
              <td>{publisher.Publisher_ID}</td>
              <td>{publisher.Publisher_First_Name}</td>
              <td>{publisher.Publisher_Last_Name}</td>
              <td>{publisher.Email}</td>
              <td>{publisher.Address}</td>
              <td>{publisher.Mobile}</td>
              <td className="action-column">
                <button className="action-button update-button" onClick={() => navigate(`/updatepublisher/${publisher.Publisher_ID}`)}>
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

export default ViewPublishers
