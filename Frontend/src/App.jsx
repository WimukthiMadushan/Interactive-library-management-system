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
import Footer from "./Components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profie" element={<UserProfile />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/updatebook" element={<UpdateBook />} />
          <Route path="/book/:bookID" element={<Book />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
