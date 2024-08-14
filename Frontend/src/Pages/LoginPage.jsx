import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../Hooks/AuthContext.jsx";
import axios from "axios";
import "./../Styles/LoginPage.css";
import Register_Img from "./../Images/user.png";
import Eye from "../Components/Eye.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LoginPage() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
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
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.", {
        closeButton: false,
      });
    }
  };

  return (
    <div className="center-wrapper">
      <div className="login-container">
        <div className="login-upper">
          <img src={Register_Img} alt="User Icon" />
          <h1>User Login</h1>
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
              type={visible ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              required
              minLength={6}
              title="Password must be at least 6 characters long"
            />
            <div className="login-eye">
              <Eye visible={visible} setVisible={setVisible} />
            </div>
          </div>

          <div className="login-button-container">
            <button className="login-button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default LoginPage;
