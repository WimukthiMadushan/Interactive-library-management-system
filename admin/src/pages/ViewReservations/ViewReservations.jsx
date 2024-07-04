import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewReservations.css';

const ViewReservations = ({url}) => {
  const navigate = useNavigate();
  const [reservations, setRreservations] = useState([]);

  // Fetch the data from the backend
  const fetchReservations = async () => {
    try {
      const response = await axios.get(`${url}/api/reserve`); 
      const formattedData = response.data.map(reserve => {
        const addOneDay = (dateString) => {
          const date = new Date(dateString);
          date.setDate(date.getDate());
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
    
        return {
          ...reserve,
          Reserve_Date: addOneDay(reserve.Reserve_Date)
        };
      });
      setRreservations(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

    useEffect(() => {
      fetchReservations();
    }, []);


  return (
    <div className="view-publishers-container">
      <h1>Reservations</h1>
      <table className="publishers-table">
        <thead>
          <tr>
            <th>Reserve ID</th>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Reserve Date</th>
            <th>Reserve Time</th>
            <th>Reserve End Time</th>
            <th>Is Complete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.Reserve_ID}>
              <td>{reservation.Reserve_ID}</td>
              <td>{reservation.User_ID}</td>
              <td>{reservation.Book_ID}</td>
              <td>{reservation.Reserve_Date}</td>
              <td>{reservation.Reserve_Time}</td>
              <td>{reservation.Reserve_End_Time}</td>
              <td>{reservation.isComplete}</td>
              <td className="action-column">
                <button className="action-button update-button" >
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

export default ViewReservations
