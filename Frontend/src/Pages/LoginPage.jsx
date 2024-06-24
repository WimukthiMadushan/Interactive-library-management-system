import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./../Hooks/AuthContext.jsx";
import axios from "axios";
import { validate } from "./../Validation/LoginValidation";
import "./../Styles/LoginPage.css";
import Register_Img from "./../Images/Register_Image.jpg";
import Eye from "../Components/Eye.jsx";

function LoginPage() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

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
        // Destructure directly from userData
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
        setErrors({});
        login(response.data.token);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        //setErrors({ apiError: "Invalid username or password" });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="center-wrapper">
      <div className="login-container">
        <div className="login-left">
          <img src={Register_Img} alt="" />
        </div>
        <div className="login-right">
          <h1>Login</h1>
          <input
            className={errors.username ? "error-input" : ""}
            type="text"
            placeholder="Username"
            name="username"
            value={userData.username}
            onChange={handleChange}
          />
          {errors.username && <p className="error">{errors.username}</p>}
          <input
            className={errors.password ? "error-input" : ""}
            type={visible ? "text" : "password"}
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <div className="eye">
            <Eye visible={visible} setVisible={setVisible} />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <button onClick={handleSubmit}>Login</button>
          {errors.apiError && <p className="error">{errors.apiError}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
