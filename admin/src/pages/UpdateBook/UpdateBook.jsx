import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets'
import './UpdateBook.css';


const UpdateBook = ({ url }) => {
  const [image,setImage] = useState(false);

  const { id } = useParams();
  const [book, setBook] = useState({
    Book_ID: '',
    ISBN_Number: '',
    Title: '',
    Description: '',
    Published_Date: ''
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`${url}/api/book/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id, url]);

  function handleChange(event) {
    if (event.target) {
      // Handle regular input changes
      const name = event.target.name;
      const value = event.target.value;
      setBook(book => ({ ...book, [name]: value }));
    } else {
      // Handle other changes
      const { name, value } = event;
      setBook(book => ({ ...book, [name]: value }));
      
    }
  }

  const handleSubmit = async (e) => {
    console.log(image);
    e.preventDefault();

    const data ={
        ISBN_Number: book.ISBN_Number,
        Title: book.Title,
        Description: book.Description,
        Published_Date: book.Published_Date,
        uploaded_file: image
    }
    try {
      await axios.put(`${url}/api/book/${id}`, data);
      alert('Book updated successfully');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="container">
      <div className="update-book">
        <h1>Update Book</h1>
        <form onSubmit={handleSubmit}>
          <div className="multi-fields">
            <label>
              Book ID:
              <input type="text" name="Book_ID" value={book.Book_ID} readOnly />
            </label>
            <label>
              ISBN Number:
              <input type="text" name="ISBN_Number" value={book.ISBN_Number} onChange={handleChange} />
            </label>
          </div>

          <label>
            Title:
            <input type="text" name="Title" value={book.Title} onChange={handleChange} />
          </label>

          <label>
            Description:
            <textarea name="Description" rows="5" value={book.Description} onChange={handleChange} />
          </label>

          <div className="multi-fields">
            <label>
              Published Date:
              <input type="date" name="Published_Date" value={book.Published_Date.split('T')[0]} onChange={handleChange} />
            </label>
            <div className="add-img-upload flex-col">
              <p>Upload Book Image</p>
              <label htmlFor="uploaded_file">
                <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
              </label>
              <input onChange={(e) => setImage(e.target.files[0])} name="uploaded_file" type="file" id='uploaded_file' hidden required />
            </div>
          </div>

          <button type="submit" className="update-button">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;
