import React ,{ useState , useEffect, useContext} from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import './AddBorrows.css'

const AddBorrows = ({url}) => {
  const [data,setData] = useState({
    userId:'',
    bookId:''
  })

  function handleChange(event) {
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value }));
  }

  const onSubmitHandler = async (event) =>{
    event.preventDefault(); // preventing reload page

    const formDataObject = {
      UserID: data.userId,
      Copy_ID: data.bookId,
    };

    try {
      const response = await axios.post(`${url}/api/borrow`, formDataObject)
      
      if (response.data.success) {
        setData({
          userId:'',
          bookId:''
        });
        toast.success(response.data.message);
        console.log(response.data);
      } else {
        toast.error(response.data.message);
        console.log(response.data.message);
      }
    } catch (error) {
      toast.error(error);
      console.error("Error submitting form:", error);
    }
  }

  // useEffect(() => {
  //   console.log(data);
  // }, [data])

  return (
    <div>
      <form className="container" onSubmit={onSubmitHandler}>
        <div className="borrow">
          <h1>Borrow Book</h1>

          <div className='input-div'>
            <label>User ID
              <input onChange={handleChange} value={data.userId} name='userId'  type="text" placeholder='User ID' required/>
            </label>
          </div>
          
          <div  className='input-div'>
            <label>Book ID
              <input onChange={handleChange} value={data.bookId} name='bookId'  type="text" placeholder='Book ID' required/>
            </label>
          </div>
          
          <button type='submit' className='add-button' >Borrow Book</button>
        </div>
      </form>
    </div>
  )
}

export default AddBorrows
