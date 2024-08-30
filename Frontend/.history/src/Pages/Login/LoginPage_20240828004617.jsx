import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../../Hooks/AuthContext";
import axios from "axios";
import "./LoginPage.css";

function LoginPage() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
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
        "http://localhost:5001/api/auth/login",
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
      console.error("Login error:", error);
    }
  };

  return (
    <div className="center-wrapper">
      <div className="login-container">
        <div className="login-upper">
          <h1>Welcome back!</h1>
          <p>Enter your credentials to access your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="input-group" style={{ marginBottom: "1rem" }}>
            <input
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
            <button className="login-button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
