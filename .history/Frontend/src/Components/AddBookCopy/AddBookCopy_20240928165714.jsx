import React, { useState, useContext } from "react";
import "./AddBookCopy.css";
import Select from "react-select";
import { StoreContext } from "./../../Hooks/StoreContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AddBookCopy = ({ showPopup, togglePopup }) => {
  const customStyles = {
    control: (provided) => ({
      ...provided,
      display: "flex",
      flexDirection: "row-reverse",
      minHeight: "36px",
      height: "36px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "36px",
      display: "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      display: "flex",
      padding: "0 12px 0 0",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    placeholder: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
    }),
    singleValue: (provided) => ({
      ...provided,
      margin: "0",
      padding: "0",
      lineHeight: "36px",
      width: "60%",
    }),
    container: (provided) => ({
      ...provided,
      width: "250px",
    }),
  };

  const { languageOptions, bookOptions } = useContext(StoreContext);

  const generateUniqueKey = () => Date.now();

  const initialState = [
    {
      key: generateUniqueKey(),
      bookID: "",
      languages: [],
      languageCopies: {},
    },
  ];

  const [rows, setRows] = useState(initialState);
  const [error, setError] = useState('');

  // const handleInputChange = (index, event) => {
  //   const { name, value } = event.target;
  //   const newRows = [...rows];
  //   newRows[index][name] = value.substring(0, 6); // Limit bookID input to 6 characters
  //   setRows(newRows);
  // };
  const handleInputChange = (index, selectedOption) => {
    const newRows = [...rows];
    newRows[index].bookID = selectedOption;
    setRows(newRows);
  };

  const handleLanguageChange = (index, selectedOptions) => {
    const newRows = [...rows];
    newRows[index].languages = selectedOptions;
    newRows[index].languageCopies = selectedOptions.reduce((acc, option) => {
      acc[option.value] = "";
      return acc;
    }, {});
    setRows(newRows);
  };

  const handleCopiesChange = (index, language, event) => {
    const { value } = event.target;
    const newRows = [...rows];
    newRows[index].languageCopies[language] = value;
    setRows(newRows);
  };

  const addRow = () => {
    setRows([
      ...rows,
      {
        key: generateUniqueKey(),
        bookID: "",
        languages: [],
        languageCopies: {},
      },
    ]);
  };

  const removeRow = (index) => {
    const newRows = rows.filter((_, i) => i !== index);
    setRows(newRows);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const dataToSend = rows.map((row) => ({
      bookID: row.bookID,
      languages: Object.entries(row.languageCopies).reduce(
        (acc, [key, value]) => {
          acc[key] = Number(value);
          return acc;
        },
        {}
      ),
    }));
    console.log(dataToSend);

    try {
      const response = await axios.post(
        `http://localhost:5000/api/bookcopy`,
        dataToSend
      );
      if (response.data.success) {
        setRows(initialState);
        togglePopup();
      } else {
        cosole.error("Error sending data", response.data.message);
      }
    } catch (error) {
      console.error("Error sending data", error);
      setError('Error sending data');
    }
  };

  return (
    <div className={`modal ${showPopup ? "show" : ""}`} data-testid="book-copy-modal">
      <div className="book-copy-modal-content">
        <form className="book-copy-container" onSubmit={handleSubmit}>
          <div className="add">
            <h1>Add Book Copies</h1>
            <FontAwesomeIcon
              className="book-copy-close-button"
              size="lg"
              icon={faXmark}
              onClick={togglePopup}
              data-testid="close-button"
            />
            <table className="book-copy-table" data-testid="book-copy-table">
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
                  <tr key={row.key} data-testid={`row-${index}`}>
                    <td>
                      <Select
                        className="book-copy-select"
                        options={[{ value: "", label: "Select Book", isDisabled: true }, ...bookOptions]}
                        name="bookID"
                        value={bookOptions.find((option) => option.value === row.bookID)}
                        onChange={(option) => handleInputChange(index, option)}
                        placeholder="Select Book"
                        required
                        data-testid={`book-select-${index}`}
                      />
                    </td>
                    <td>
                      <Select
                        name="languages"
                        options={languageOptions}
                        placeholder="Select Languages"
                        onChange={(selectedOptions) => handleLanguageChange(index, selectedOptions)}
                        value={row.languages}
                        isMulti
                        required
                        data-testid={`language-select-${index}`}
                      />
                    </td>
                    <td>
                      {row.languages.map((language) => (
                        <div key={language.value} className="language-copies" data-testid={`copies-${language.value}-${index}`}>
                          <label>{language.label} Copies</label>
                          <input
                            type="number"
                            value={row.languageCopies[language.value] || ""}
                            onChange={(event) => handleCopiesChange(index, language.value, event)}
                            placeholder={`Number of ${language.label} copies`}
                            required
                            data-testid={`copies-input-${language.value}-${index}`}
                          />
                        </div>
                      ))}
                    </td>
                    <td className="delete-column">
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() => removeRow(index)}
                        data-testid={`delete-button-${index}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="add-book-copy-buttons">
              <button type="button" onClick={addRow} className="add-copy-button" data-testid="add-row-button">
                Add New Row
              </button>
              <button type="submit" className="add-copy-button" data-testid="submit-button">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookCopy;
