import React from "react";
import { useState } from "react";
import { validate } from "./../Validation/LoginValidation";
import "./../Styles/LoginPage.css";
import Register_Img from "./../Images/Register_Image.jpg";

function LoginPage() {
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { isValid, newErrors } = validate(userData);
    if (isValid) {
      console.log(userData);
      setUserData({
        username: "",
        password: "",
      });
      setErrors({});
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
            className={errors.email ? "error-input" : ""}
            type="email"
            placeholder="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <button onClick={handleSubmit}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
