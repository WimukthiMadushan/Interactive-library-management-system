import React ,{ useState , useEffect, useContext} from 'react'
import './AddBookCopy.css'
import Select from 'react-select';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import {toast} from 'react-toastify';


const AddBookCopy = () => {

  const url = 'http://localhost:5000';
  const { languageOptions,bookOptions } = useContext(StoreContext);

  const generateUniqueKey = () => Date.now();

  const initialState = [
    { key: generateUniqueKey(), bookID: null, languages: [], languageCopies: {} }
  ];

  const [rows, setRows] = useState(initialState);

  const handleInputChange = (index, event) => {
    const { name, value } = event;
    const newRows = [...rows];
    newRows[index][name] = value.substring(0,6);
    setRows(newRows);
  };

  const handleLanguageChange = (index, selectedOptions) => {
    const newRows = [...rows];
    newRows[index].languages = selectedOptions;
    newRows[index].languageCopies = selectedOptions.reduce((acc, option) => {
      if (!acc[option.value]) {
        acc[option.value] = '';
      }
      return acc;
    }, {});
    setRows(newRows);
  };

  const handleCopiesChange = (index, language, event) => {
    const value = event.target.value;
    const newRows = [...rows];
    newRows[index].languageCopies[language] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([...rows, { key: generateUniqueKey(), bookID: null, languages: [], languageCopies: {} }]);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((row, i) => i !== index);
    setRows(newRows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Transform data
    const dataToSend = rows.map(row => ({
      bookID: row.bookID,
      languages: Object.entries(row.languageCopies).reduce((acc, [key, value]) => {
        key = key.slice(-4).substring(0,3)
        acc[key] = Number(value);
        return acc;
      }, {})
    }));

    console.log('Data to send:', dataToSend);

    try {
      const response = await axios.post(`${url}/api/bookcopy`, dataToSend);
      if(response.data.success){
        toast.success(response.data.message);
      }
      else{
        toast.error("Error adding book copies");
      }
      
      setRows([{ key: generateUniqueKey(), bookID: null, languages: [], languageCopies: {} }]); // Reset the state to initial state
      
      // Handle successful response
    } catch (error) {
      console.error('Error sending data', error);
      // Handle error
    }
    
    
  };
  
  useEffect(() => {
    console.log(rows);
  }, [rows]);


  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
        <div className="add">
          <h1>Add Book Copies</h1>
          <table className="book-copy-table">
            <thead>
              <tr>
                <th>Book ID</th>
                <th>Languages</th>
                <th>Number of Copies</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <Select
                      options={[{ value: '', label: 'Select Book', isDisabled: true }, ...bookOptions]}
                      name="bookID"
                      value={bookOptions.find(option => option.value === row.bookID)|| { value: '', label: 'Select Book', isDisabled: true }}
                      onChange={(option) => handleInputChange(index, { name: 'bookID', value: option.value ? option.value : ''  })}
                      placeholder="Book ID"
                      required
                    />
                  </td>
                  <td>
                    <Select
                      isMulti
                      name="languages"
                      options={languageOptions}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      onChange={(selectedOptions) => handleLanguageChange(index, selectedOptions)}
                      value={row.languages}
                      required
                    />
                  </td>
                  <td>
                    {row.languages.map(language => (
                      <div key={language.value} className="language-copies">
                        <label>{language.label} Copies</label>
                        <input
                          type="number"
                          value={row.languageCopies[language.value]}
                          onChange={(event) => handleCopiesChange(index, language.value, event)}
                          placeholder={`Number of ${language.label} copies`}
                          required
                        />
                      </div>
                    ))}
                  </td>
                  <td className='delete-column'>
                    <button type="button" className="delete-button" onClick={() => removeRow(index)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={addRow} className="add-button">Add New Row</button>
          <button type="submit" className="add-button">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default AddBookCopy
