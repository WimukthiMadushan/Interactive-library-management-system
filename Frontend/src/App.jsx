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
import Book from "./Pages/Book";
import UserProfile from "./Pages/UserProfile";
import SearchBook from "./Pages/SearchBook";
import { useAuth } from "./Hooks/AuthContext.jsx";
import BookManagment from "./Pages/BookManagment.jsx";
import AuthorManagment from "./Pages/AuthorManagment.jsx";
import PublisherManagment from "./Pages/PublisherManagment.jsx";
import UserManagment from "./Pages/UserManagment.jsx";
import BorrowBookManagment from "./Pages/BorrowBookManagment.jsx";
import ReservationManagment from "./Pages/ReservationManagment.jsx";

function App() {
  const { authState } = useAuth();
  const { userId, role } = authState;

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={!userId && <Register />} />
        <Route path="/login" element={!userId && <LoginPage />} />
        <Route path="/searchbooks" element={<SearchBook />} />
        <Route path="/profile" element={userId && <UserProfile />} />
        <Route path="/book/:bookID" element={<Book />} />
        <Route
          path="/bookmanagement"
          element={role === "Administrator" && <BookManagment />}
        />
        <Route
          path="/authormanagement"
          element={role === "Administrator" && <AuthorManagment />}
        />
        <Route
          path="/publishermanagement"
          element={role === "Administrator" && <PublisherManagment />}
        />
        <Route
          path="/usermanagement"
          element={role === "Administrator" && <UserManagment />}
        />
        <Route
          path="/borrowbookmanagement"
          element={
            role === "Administrator" ||
            (role === "Receptionist" && <BorrowBookManagment />)
          }
        />
        <Route
          path="/reseravtionbookmanagment"
          element={
            role === "Administrator" ||
            (role === "Receptionist" && <ReservationManagment />)
          }
        />
      </Routes>
    </div>
  );
}

export default App;
