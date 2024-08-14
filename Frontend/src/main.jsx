import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Hooks/AuthContext.jsx";
import SpeechRecognition from "./Components/SpeechRecognition.jsx";
import StoreContextProvider from "./Hooks/StoreContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Select from "react-select";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <StoreContextProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </StoreContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
