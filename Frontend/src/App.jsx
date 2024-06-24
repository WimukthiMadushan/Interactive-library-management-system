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

function App() {
  const { authState } = useAuth();
  const { userId, role } = authState;

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/searchbooks" element={<SearchBook />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/updatebook" element={<UpdateBook />} />
        <Route path="/book/:bookID" element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;
