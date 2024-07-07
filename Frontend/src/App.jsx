import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import AddBook from "./Pages/AddBook";
import UpdateBook from "./Pages/UpdateBook";
import Book from "./Pages/Book";
import UserProfile from "./Pages/UserProfile";
import SearchBook from "./Pages/SearchBook";
import { useAuth } from "./Hooks/AuthContext.jsx";
import AdminLogin from "./Pages/AdminLogin.jsx";
import ReceptionLogin from "./Pages/ReceptionLogin.jsx";
import BookManagment from "./Pages/BookManagment.jsx";
import AuthorManagment from "./Pages/AuthorManagment.jsx";
import PublisherManagment from "./Pages/PublisherManagment.jsx";
import UserManagment from "./Pages/UserManagment.jsx";

function App() {
  const { authState } = useAuth();
  const { userId, role } = authState;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/receptionlogin" element={<ReceptionLogin />} />
        <Route path="/searchbooks" element={<SearchBook />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/updatebook" element={<UpdateBook />} />
        <Route path="/book/:bookID" element={<Book />} />
        <Route path="/bookmanagement" element={<BookManagment />} />
        <Route path="/authormanagement" element={<AuthorManagment />} />
        <Route path="/publishermanagement" element={<PublisherManagment />} />
        <Route path="/usermanagement" element={<UserManagment />} />
      </Routes>
    </div>
  );
}

export default App;
