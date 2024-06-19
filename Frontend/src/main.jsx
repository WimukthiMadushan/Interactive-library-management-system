import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./Pages/Register.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import NavBar from "./Components/NavBar.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Hooks/AuthContext.jsx";
import Header from "./Components/Header.jsx";
import SideBar from "./Components/SideBar.jsx";
import UserProfile from "./Pages/UserProfile";
import AddBook from "./Pages/AddBook";
import Pagination from "./Components/Pagination.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
