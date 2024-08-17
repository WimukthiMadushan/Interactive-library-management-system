import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const url = "http://localhost:5000";

  const [authors, setAuthos] = useState([]);
  const [publisherOptions, setPublisherOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [bookOptions, setBookOptions] = useState([]);
  const [loading, setLoading] = useState(true); // Optional loading state
  const [error, setError] = useState(null); // Optional error state

  const fetchData = async () => {
    try {
      const [
        publisherResponse,
        authorResponse,
        categoryResponse,
        languageResponse,
        bookResponse,
      ] = await Promise.all([
        axios.get(`${url}/api/publisher`),
        axios.get(`${url}/api/author`),
        axios.get(`${url}/api/category`),
        axios.get(`${url}/api/language`),
        axios.get(`${url}/api/book`),
      ]);

      //console.log("Publisher Response:", publisherResponse.data);
      //console.log("Author Response:", authorResponse.data);
      //console.log("Category Response:", categoryResponse.data);
      //console.log("Language Response:", languageResponse.data);
      //console.log("Book Response:", bookResponse.data);

      setPublisherOptions(
        publisherResponse.data.map((publisher) => ({
          value: publisher.Publisher_ID,
          label: `${publisher.Publisher_ID}. ${publisher.Publisher_First_Name} ${publisher.Publisher_Last_Name}`,
        }))
      );

      setAuthorOptions(
        authorResponse.data.map((author) => ({
          value: author.Author_ID,
          label: `${author.Author_ID}. ${author.First_Name} ${author.Last_Name}`,
        }))
      );

      setCategoryOptions(
        categoryResponse.data.map((category) => ({
          value: category.Cat_ID,
          label: category.Cat_Name,
        }))
      );

      setLanguageOptions(
        languageResponse.data.map((language) => ({
          value: language.Language_ID,
          label: language.Language_Name,
        }))
      );

      setBookOptions(
        bookResponse.data.map((book) => ({
          value: book.Book_ID,
          label: book.Title,
        }))
      );

      setLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      setError("Error fetching data. Please try again later.");
      setLoading(false); // Set loading to false if there's an error
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        publisherOptions,
        authorOptions,
        categoryOptions,
        languageOptions,
        bookOptions,
        loading,
        error,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
