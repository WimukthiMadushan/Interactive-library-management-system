import React ,{ useState , useEffect, useContext} from 'react'
import './AddAuthors.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

const AddAuthors = ({url}) => {

  const [data,setData] = useState({
    firstName:'',
    lastName:'',
    email:'',
    street:"",
    city :'',
    country:'',
    nic:'',
    phone:''
  })

  function handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault(); // preventing reload page
    const address = `${data.street}, ${data.city}, ${data.country}.`;

    const formDataObject = {
      First_Name: data.firstName,
      Last_Name: data.lastName,
      Email: data.email,
      Address: address,
      Mobile: data.phone,
      NIC: data.nic,
    };

    try {
      const response = await axios.post(`${url}/api/author/`, formDataObject)
      console.log(response.data);
      if (response.status === 201) {
        setData({
          firstName: '',
          lastName: '',
          email: '',
          street: "",
          city: '',
          country: '',
          nic: '',
          phone: ''
        });
        toast.success(response.data.message);
        console.log(response.data);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data])

  return (
    <div>
      <form className="container" onSubmit={onSubmitHandler}>
        <div className="add">
          <h1>Add Authors</h1>

          <div className="multi-fields">
            <input onChange={handleChange} value={data.firstName} name='firstName'  type="text" placeholder='First Name' required/>
            <input onChange={handleChange} value={data.lastName} name='lastName' type="text" placeholder='Last Name' required/>
          </div>
          
          <input onChange={handleChange} value={data.email} name='email'  type="email" placeholder='Email address' required/>

          <h3>Address Details</h3>
          <input onChange={handleChange} value={data.street} name='street'  type="text" placeholder='Street' required/>

          <div className="multi-fields">
            <input onChange={handleChange} value={data.city} name='city'  type="text" placeholder='City' required/>
            <input onChange={handleChange} value={data.country} name='country' type="text" placeholder='Country' required/>
          </div>

          <div className="multi-fields">
            <input onChange={handleChange} value={data.nic} name='nic'  type="text" placeholder='NIC Number' required/>
            <input onChange={handleChange} value={data.phone} name='phone' type="text" placeholder='Phone Number' required/>
          </div>

          <button type='submit' className='add-button' >Add Author</button>
        </div>
      </form>
    </div>
  )
}

export default AddAuthors
