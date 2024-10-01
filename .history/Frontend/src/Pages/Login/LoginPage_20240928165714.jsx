import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../Hooks/AuthContext";
import NotificationModal from "../../Components/Modals/NotificationModal";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const handleCloseError = () => setShowError(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { username, password } = userData;
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          Username: username,
          Password: password,
        }
      );
      setUserData({
        username: "",
        password: "",
      });
      login(response.data.token);
      navigate("/");
    } catch (error) {
      setModalMessage("Login Failed");
      setShowError(true);
      //console.error("Login error:", error);
    }
  };

  return (
    <div className="center-wrapper" data-testid="login-page">
      <div className="login-container">
        <div className="login-upper">
          <h1>Welcome back!</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit} data-testid="login-form">
          <div className="input-group" style={{ marginBottom: "1rem" }}>
            <input
              data-testid="username-input"
              type="text"
              placeholder="Username"
              name="username"
              value={userData.username}
              onChange={handleChange}
              required
              minLength={3}
              title="Username must be at least 3 characters long"
            />
          </div>

          <div className="input-group">
            <input
              data-testid="password-input"
              type="password"
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              minLength={6}
              title="Password must be at least 6 characters long"
            />
          </div>

          <div className="login-button-container">
            <button
              className="login-button"
              type="submit"
              data-testid="login-button"
            >
              Login
            </button>
          </div>
        </form>

        <NotificationModal
          show={showError}
          handleClose={handleCloseError}
          title={"Error"}
          message={modalMessage}
          isSuccess={false}
          data-testid="error-modal"
        />
      </div>
    </div>
  );
}

export default LoginPage;
