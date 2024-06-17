import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./Pages/Register.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import NavBar from "./Components/NavBar.jsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header.jsx";
import SideBar from "./Components/SideBar.jsx";
import UserProfile from "./Pages/UserProfile";
import AddBook from "./Pages/AddBook";
import Pagination from "./Components/Pagination.jsx";

let staticData = [
  { title: "Title 1", description: "Description 1" },
  { title: "Title 2", description: "Description 2" },
  { title: "Title 3", description: "Description 3" },
  { title: "Title 4", description: "Description 4" },
  { title: "Title 5", description: "Description 5" },
  { title: "Title 6", description: "Description 6" },
  { title: "Title 7", description: "Description 7" },
  { title: "Title 8", description: "Description 8" },
  { title: "Title 9", description: "Description 9" },
  { title: "Title 10", description: "Description 10" },
  { title: "Title 11", description: "Description 11" },
  { title: "Title 12", description: "Description 12" },
  { title: "Title 13", description: "Description 13" },
  { title: "Title 14", description: "Description 14" },
  { title: "Title 15", description: "Description 15" },
  { title: "Title 16", description: "Description 16" },
  { title: "Title 17", description: "Description 17" },
  { title: "Title 18", description: "Description 18" },
  { title: "Title 19", description: "Description 19" },
  { title: "Title 20", description: "Description 20" },
];
let itemsPerPage = 5;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
