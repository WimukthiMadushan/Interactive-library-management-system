import { createContext, useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:5000";

  const [publisherlist, setPublisherList] = useState([]);
  const [publisherOptions, setPublisherOptions] = useState([]);

  const [authorlist, setAuthorList] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);

  const [categoryList, setCategoryList] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);

  const [languagelist, setLanguageList] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);

  const [booklist, setBookList] = useState([]);
  const [bookOptions, setBookOptions] = useState([]);

  // get publishers list
  const fetchPublisherList = async () => {
    try {
      const response = await axios.get(url + "/api/publisher");
      setPublisherList(response.data);

      const options = response.data.map((publisher) => ({
        value: `${publisher.Publisher_ID}`,
        label: `${publisher.Publisher_ID}. ${publisher.Publisher_First_Name} ${publisher.Publisher_Last_Name}`,
      }));
      setPublisherOptions(options);
    } catch (error) {
      console.error("Error fetching publisher list:", error);
    }
  };

  // get authors list
  const fetchAuthorList = async () => {
    try {
      const response = await axios.get(url + "/api/author");
      setAuthorList(response.data);

      const options = response.data.map((author) => ({
        value: `${author.Author_ID}`,
        label: `${author.Author_ID}. ${author.First_Name} ${author.Last_Name}`,
      }));
      setAuthorOptions(options);
    } catch (error) {
      console.error("Error fetching author list:", error);
    }
  };

  // Fetch categories list
  const fetchCategoryList = async () => {
    try {
      const response = await axios.get(url + "/api/category");
      setCategoryList(response.data);

      const options = response.data.map((category) => ({
        value: `${category.Cat_ID}`,
        label: `${category.Cat_Name}`,
      }));
      setCategoryOptions(options);
    } catch (error) {
      console.error("Error fetching category list:", error);
    }
  };

  // Fetch languages list
  const fetchLanguageList = async () => {
    try {
      const response = await axios.get(url + "/api/language");
      setLanguageList(response.data);

      const options = response.data.map((language) => ({
        value: `${language.Language_ID}`,
        label: `${language.Language_Name}`,
      }));
      setLanguageOptions(options);
    } catch (error) {
      console.error("Error fetching Language list:", error);
    }
  };

  // Fetch books list
  const fetchBookList = async () => {
    try {
      const response = await axios.get(url + "/api/book");
      setBookList(response.data);

      const options = response.data.map((book) => ({
        value: `${book.Book_ID}. ${book.Title}`,
        label: `${book.Title}`,
      }));
      setBookOptions(options);
    } catch (error) {
      console.error("Error fetching Book list:", error);
    }
  };

  useEffect(() => {
    fetchPublisherList();
    fetchAuthorList();
    fetchCategoryList();
    fetchLanguageList();
    fetchBookList();
  }, []);

  const contextValue = {
    publisherlist,
    publisherOptions,
    authorOptions,
    categoryOptions,
    languageOptions,
    bookOptions,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
