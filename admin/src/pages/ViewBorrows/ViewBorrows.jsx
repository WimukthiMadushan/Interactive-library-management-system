import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ViewBorrows.css';
import { toast } from 'react-toastify';

const ViewBorrows = ({url}) => {
  const navigate = useNavigate();
  const [borrows, setBorrows] = useState([]);

  // Fetch the data from the backend
  const fetchBorrows = async () => {
    try {
      const response = await axios.get(`${url}/api/borrow`); 
      const formattedData = response.data.map(borrow => {
        const addOneDay = (dateString) => {
          const date = new Date(dateString);
          date.setDate(date.getDate());
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0');
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
        };
  
        return {
          ...borrow,
          Borrow_Date: addOneDay(borrow.Borrow_Date),
          Return_Date: addOneDay(borrow.Return_Date)
        };
      });
      setBorrows(formattedData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleReturn = async (id) => {
    try {
      const response = await axios.put(`${url}/api/borrow/return/${id}`);
      if(response.data.success){
        toast.success('Book returned successfully');
      }else{
        toast.error('Error returning the book');
      }
      fetchBorrows(); // Refresh the borrow list
    } catch (error) {
      console.error('Error returning the book:', error);
    }
  };

  const handleRenew = async (id) => {
    try {
      const response = await axios.put(`${url}/api/borrow/renew/${id}`);
      if(response.data.success){
        toast.success('Book renewed successfully');
      }else{
        toast.error('Error renewing the book');
      }
      fetchBorrows(); // Refresh the borrow list
    } catch (error) {
      console.error('Error renewing the book:', error);
    }
  };

    useEffect(() => {
      fetchBorrows();
    }, []);


  return (
    <div className="view-authors-container">
      <h1>Borrows</h1>
      <table className="authors-table">
        <thead>
          <tr> 
            <th>Borrow ID</th>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Borrow Date</th>
            <th>Borrow Time</th>
            <th>Return Date</th>
            <th>isComplete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {borrows.map((borrow) => (
            <tr key={borrow.Borrow_ID}>
              <td>{borrow.Borrow_ID}</td>
              <td>{borrow.User_ID}</td>
              <td>{borrow.Book_ID}</td>
              <td>{borrow.Borrow_Date}</td>
              <td>{borrow.Borrow_Time}</td>
              <td>{borrow.Return_Date}</td>
              <td>{borrow.isComplete}</td>
              <td className="action-column">
                {/* <button className="action-button update-button" >
                  Update
                </button> */}
                <button className="action-button return-button" onClick={() => handleReturn(borrow.Borrow_ID)}>
                  Return
                </button>
                <button className="action-button renew-button" onClick={() => handleRenew(borrow.Borrow_ID)} >
                  Renew
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewBorrows
