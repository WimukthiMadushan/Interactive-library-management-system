import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import NavBar from "./Components/NavBar/NavBar";
import HomePage from "./Pages/HomePage/HomePage";
import Register from "./Pages/Register/Register";
import LoginPage from "./Pages/Login/LoginPage";
import Book from "./Pages/Book/Book.jsx";
import UserProfile from "./Pages/UserProfile/UserProfile.jsx";
import SearchBook from "./Pages/SearchBook/SearchBook.jsx";
import { useAuth } from "./Hooks/AuthContext.jsx";
import BookManagment from "./Pages/BookManagment/BookManagment.jsx";
import AuthorManagment from "./Pages/AuthorManagment/AuthorManagment.jsx";
import PublisherManagment from "./Pages/PublisherManagment/PublisherManagment.jsx";
import UserManagment from "./Pages/UserManagment/UserManagment.jsx";
import BorrowBookManagment from "./Pages/BorrowBooksManagment/BorrowBookManagment.jsx";
import ReservationManagment from "./Pages/ReservationManagment/ReservationManagment.jsx";
import BookDetails from "./Pages/BookDetails/BookDetails.jsx";
import AdminButtons from "./Pages/AdminDashboard/AdminButtons.jsx";
import ReceptionDashboard from "./Pages/ReceptionDashboard/ReceptionDashboard.jsx";
import ProfileDetails from "./Pages/ProfileDetails/ProfileDetails.jsx";

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
        <Route path="/profile/:id" element={userId && <UserProfile />} />
        <Route path="/profiledetails/:id" element={<ProfileDetails />} />
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
        <Route path="/bookdetails" element={<BookDetails />} />
        <Route path="/adminbuttons" element={<AdminButtons />} />
        <Route path="/receptionbuttons" element={<ReceptionDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
