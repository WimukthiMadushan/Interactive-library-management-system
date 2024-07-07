import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../Hooks/AuthContext";
import { validate } from "../Validation/LoginValidation";
import Eye from "../Components/Eye";
import "../Styles/AdminLogin.css";
import ReceptionLoginImg from "./../Images/user.png";
import { useNavigate } from "react-router-dom";
import Star from "./../Images/blue_star.png";

function ReceptionLogin() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { isValid, newErrors } = validate(userData);
    if (isValid) {
      try {
        //console.log(userData);
        const response = await axios.post(
          "http://localhost:5000/api/auth/receptionlogin",
          {
            Username: userData.username,
            Password: userData.password,
          }
        );
        setUserData({ username: "", password: "" });
        setErrors({});
        login(response.data.token);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        setErrors({ apiError: "Invalid username or password" });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="adminlogin-container">
      <div className="admin-login-upper">
        <img
          src={ReceptionLoginImg}
          alt="Reception"
          className="admin-login-img"
        />
        <img className="star" src={Star} alt="" />
        <h1 className="admin-login-heading">Reception Login</h1>
      </div>
      <form className="admin-login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className={`input-field ${errors.username ? "error-input" : ""}`}
            type="text"
            placeholder="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="error-message">{errors.username}</p>
          )}
        </div>
        <div className="input-group">
          <input
            className={`input-field ${errors.password ? "error-input" : ""}`}
            type={visible ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <div className="admin-login-eye">
            <Eye visible={visible} setVisible={setVisible} />
          </div>
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <button className="login-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default ReceptionLogin;
