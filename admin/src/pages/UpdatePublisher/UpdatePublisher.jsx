import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdatePublisher.css';
import {toast} from 'react-toastify';

const UpdatePublisher = ({url}) => {
  const navigate = useNavigate();

  const { id } = useParams();
  const [data,setData] = useState({ 
    Publisher_ID:'',
    Publisher_First_Name:'',
    Publisher_Last_Name:'',
    Email:'',
    Address:'',
    Mobile:''
  })

  const fetchPublisher = async () => {
    try {
      const response = await axios.get(`${url}/api/publisher/${id}`);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching publisher:', error);
    }
  }

  function handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.put(`${url}/api/publisher/${id}`, data);
            toast.success('Publisher updated successfully');
            navigate('/publishers');
        } catch (error) {
            console.error('Error updating Data:', error);
        }
    }

  useEffect(() => {
    fetchPublisher();
    console.log(data);
  },[id,url])

  return (
    <div>
      <form className="container" onSubmit={handleSubmit} >
        <div className="update">
          <h1>Update Publishers</h1>

          <div className='input-div'>
            <label>Publisher ID : 
                <input  onChange={handleChange} value={data.Publisher_ID} name='Publisher_ID'  type="text" placeholder='Publisher ID' readOnly/>
            </label>
          </div>

          <div className="multi-fields">
            <label>First Name :
            <input onChange={handleChange} value={data.Publisher_First_Name} name='Publisher_First_Name'  type="text" placeholder='First Name' />
            </label>
            <label>Last Name :
            <input onChange={handleChange} value={data.Publisher_Last_Name} name='Publisher_Last_Name' type="text" placeholder='Last Name' />
            </label>
          </div>
          
          <div className='input-div'>
            <label>Email : 
                <input  onChange={handleChange} value={data.Email} name='Email'  type="email" placeholder='Email address' />
            </label>
          </div>
          
          <div className='input-div'>
            <label>Address : 
                <input onChange={handleChange} value={data.Address} name='Address'  type="text" placeholder='Address' />
            </label>
          </div>

          <div className='input-div'>
            <label>Phone Number : 
                <input onChange={handleChange} value={data.Mobile} name='phone'  type="text" placeholder='Phone Number' required/>
            </label>
          </div>
          <button type='submit' className='add-button' >Update Publisher</button>
        </div>
      </form>
    </div>
  )
}

export default UpdatePublisher
