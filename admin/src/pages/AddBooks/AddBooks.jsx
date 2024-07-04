import React ,{ useState , useEffect, useContext} from 'react'
import { DatePicker } from 'rsuite';
import './AddBooks.css'
import { assets } from '../../assets/assets'
import Select from "react-select";
import 'rsuite/DatePicker/styles/index.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddBooks = ({url}) => {
  const {publisherOptions,authorOptions,categoryOptions} = useContext(StoreContext);
  
  const [image,setImage] = useState(false);

  const [data,setData] = useState({
    title:'',
    isbn:'',
    description:'',
    author:"",
    publisher :'',
    category:'',
    pdate:''
  })

  function handleChange(event) {
    if (event.target) {
      // Handle regular input changes
      const name = event.target.name;
      const value = event.target.value;
      setData(data => ({ ...data, [name]: value }));
    } else {
      // Handle other changes
      const { name, value } = event;
      setData(data => ({ ...data, [name]: value }));
      
    }
  }
  const authorIdMatch = data.author.match(/^\d+/);
  const authorId = authorIdMatch ? authorIdMatch[0] : "";
  const categoryIdMatch = data.category.match(/^\d+/);
  const categoryId = categoryIdMatch ? categoryIdMatch[0] : "";
  const publisherIdMatch = data.publisher.match(/^\d+/);
  const publisherId = publisherIdMatch ? publisherIdMatch[0] : "";

  // for formatting Date
  const formatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };
  
  const formattedDate = formatDate(data.pdate);

  const onSubmitHandler = async (event) =>{
    event.preventDefault(); 
    const formData = new FormData();
    formData.append('ISBN_Number',data.isbn);
    formData.append('Title',data.title);
    formData.append('Author',Number(authorId));
    formData.append('Description',data.description);
    formData.append('Published_Date',formattedDate);
    formData.append('Category',Number(categoryId));
    formData.append('Publisher',Number(publisherId));
    formData.append('uploaded_file',image);

    const response = await axios.post(`${url}/api/book`,formData) // calling backend end point for book add
    if(response.status===201){
      setData({
        title:'',
        isbn:'',
        description:'',
        author:"",
        publisher :'',
        category:'',
        pdate:''
      })
      toast.success(response.data.message);
      setImage(false);
      console.log(response.data.message);
    }
    else{
      toast.error(response.data.message);
      console.log(response.data.message);
    }
  }

  // useEffect(() => {
  //   console.log(data);
  //   console.log(formattedDate);
  // }, [data])


  return (
      <form className="container" onSubmit={onSubmitHandler}>
        <div className="add-books">
          <h1>Add Books</h1>
          <div className="add-img-upload flex-col">
            <p>Upload Book Image</p>
            <label htmlFor="uploaded_file">
              <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} name="uploaded_file" type="file" id='uploaded_file' hidden required />
          </div>

          <div className="multi-fields">
            <input onChange={handleChange} value={data.title} name='title'  type="text" placeholder='Book Title' required/>
            <input onChange={handleChange} value={data.isbn} name='isbn' type="text" placeholder='ISBN Number' required/>
          </div>
          
          <textarea onChange={handleChange} value={data.description} name='description' rows='5' placeholder='write description here' required/>

          <div className='multi-select'>
          <Select className='select'
            options={[{ value: '', label: 'Select Author', isDisabled: true }, ...authorOptions]}
            onChange={(option) => handleChange({ name: 'author', value: option ? option.value : '' })}
            value={authorOptions.find(option => option.value === data.author) || { value: '', label: 'Select Author', isDisabled: true }}
            placeholder="Select Author"
          />
          <Select className='select'
            options={[{ value: '', label: 'Select Publisher', isDisabled: true }, ...publisherOptions]}
            onChange={(option) => handleChange({ name: 'publisher', value: option ? option.value : '' })}
            value={publisherOptions.find(option => option.value === data.publisher) || { value: '', label: 'Select Publisher', isDisabled: true }}
            placeholder="Select Publisher"
          />
          <Select className='select'
            options={[{ value: '', label: 'Select Category', isDisabled: true }, ...categoryOptions]}
            onChange={(option) => handleChange({ name: 'category', value: option ? option.value : '' })}
            value={categoryOptions.find(option => option.value === data.category) || { value: '', label: 'Select Category', isDisabled: true }}
            placeholder="Select Category"
          />
        </div>

          <DatePicker className='date' selected={data.pdate}
          onChange={(date) => handleChange({ name: 'pdate', value: date })} name='pdate' appearance="default" placeholder="Published Date"/>

          <button type='submit' className='add-button' >Add Book</button>
        </div>
      </form>
  )
}

export default AddBooks