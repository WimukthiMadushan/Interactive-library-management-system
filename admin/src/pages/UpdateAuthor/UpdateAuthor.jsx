import React, { useEffect,useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UpdateAuthor.css'
import {toast} from 'react-toastify';

const UpdateAuthor = ({url}) => {
    const navigate = useNavigate();

    const { id } = useParams();
    const [data,setData] = useState({  
      Author_ID:'',
      First_Name:'',
      Last_Name:'',
      Email:'',
      Address:'',
      Mobile:'',
      NIC:'',
    })
  
    const fetchAuthor = async () => {
      try {
        const response = await axios.get(`${url}/api/author/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching Author:', error);
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
              await axios.put(`${url}/api/author/${id}`, data);
              toast.success('Author updated successfully');
              navigate('/authors');
          } catch (error) {
              console.error('Error updating Data:', error);
          }
      }
  
    useEffect(() => {
      fetchAuthor();
    },[id,url])
  
    return (
      <div>
        <form className="container" onSubmit={handleSubmit} >
          <div className="update">
            <h1>Update Authors</h1>
  
            <div className='input-div'> 
              <label>Author ID : 
                  <input  onChange={handleChange} value={data.Author_ID} name='Author_ID'  type="text" placeholder='Author ID' readOnly/>
              </label>
            </div>
  
            <div className="multi-fields">
                <label>First Name :
                    <input onChange={handleChange} value={data.First_Name} name='First_Name'  type="text" placeholder='First Name' />
                </label>
                <label>Last Name :
                    <input onChange={handleChange} value={data.Last_Name} name='Last_Name' type="text" placeholder='Last Name' />
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
  
            <div className="multi-fields">
                <label>Mobile :
                    <input onChange={handleChange} value={data.Mobile} name='Mobile'  type="text" placeholder='Mobile' />
                </label>
                <label>NIC :
                    <input onChange={handleChange} value={data.NIC} name='NIC' type="text" placeholder='NIC' />
                </label>  
            </div>
            <button type='submit' className='add-button' >Update Author</button>
          </div>
        </form>
      </div>
    )
}

export default UpdateAuthor
