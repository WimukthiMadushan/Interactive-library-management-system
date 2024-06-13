import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Register from "./Pages/Register.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import NavBar from "./Components/NavBar.jsx";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header.jsx";
import SideBar from "./Components/SideBar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
