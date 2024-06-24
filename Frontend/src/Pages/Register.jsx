import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "./../Validation/RegisterValidation";
import "./../Styles/RegisterPage.css";
import Register_Img from "./../Images/Register_Image.jpg";

function Register() {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    idCardNumber: "",
    phoneNumber: "",
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
        email: "",
        password: "",
        idCardNumber: "",
        phoneNumber: "",
      });
      setErrors({});
    } else {
      setErrors(newErrors);
      toast.error("Please fill in the input field.", {
        closeButton: false,
      });
    }
  };

  return (
    <div className="center-wrapper">
      <div className="register-container">
        <div className="register-left">
          <img src={Register_Img} alt="" />
        </div>
        <div className="register-right">
          <h1>Register</h1>
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
          {errors.email && <p className="error">{errors.email}</p>}
          <input
            className={errors.password ? "error-input" : ""}
            type="password"
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
          <input
            className={errors.password ? "error-input" : ""}
            type="text"
            placeholder="NIC Number"
            name="idCardNumber"
            value={userData.idCardNumber}
            onChange={handleChange}
          />
          {errors.idCardNumber && (
            <p className="error">{errors.idCardNumber}</p>
          )}

          <input
            className={errors.phoneNumber ? "error-input" : ""}
            type="text"
            placeholder="Phone Number"
            name="phoneNumber"
            value={userData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          <button onClick={handleSubmit}>Register</button>
        </div>
      </div>
    </div>
  );
}

export default Register;
