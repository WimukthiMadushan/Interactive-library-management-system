import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../Components/Eye";
import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { validate } from "./../Validation/RegisterValidation";
import "./../Styles/RegisterPage.css";
import Register_Img from "./../Images/Register_Image.jpg";

function Register() {
  const [userData, setUserData] = useState({
    First_Name: "",
    Last_Name: "",
    Username: "",
    Password: "",
    retypePassword: "",
    Email: "",
    Address: "",
    NIC: "",
    Mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
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
      console.log(userData);
      try {
        await axios.post("http://localhost:5000/api/auth/register", userData);
        toast.success("Registration Successful", {
          closeButton: false,
        });
        setUserData({
          First_Name: "",
          Last_Name: "",
          Username: "",
          Password: "",
          retypePassword: "",
          Email: "",
          Address: "",
          NIC: "",
          Mobile: "",
        });
        setErrors({});
        navigate("/login");
      } catch (error) {
        console.error("Registration failed", error);
        toast.error("Registration failed. Please try again.", {
          closeButton: false,
        });
      }
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
          <img src={Register_Img} alt="Register" />
        </div>
        <div className="register-right">
          <h1>Register</h1>

          <input
            className={errors.First_Name ? "error-input" : ""}
            type="text"
            placeholder="First Name"
            name="First_Name"
            value={userData.First_Name}
            onChange={handleChange}
          />
          {errors.First_Name && <p className="error">{errors.First_Name}</p>}

          <input
            className={errors.Last_Name ? "error-input" : ""}
            type="text"
            placeholder="Last Name"
            name="Last_Name"
            value={userData.Last_Name}
            onChange={handleChange}
          />
          {errors.Last_Name && <p className="error">{errors.Last_Name}</p>}

          <input
            className={errors.Username ? "error-input" : ""}
            type="text"
            placeholder="Username"
            name="Username"
            value={userData.Username}
            onChange={handleChange}
          />
          {errors.Username && <p className="error">{errors.Username}</p>}

          <input
            className={errors.Email ? "error-input" : ""}
            type="Email"
            placeholder="Email"
            name="Email"
            value={userData.Email}
            onChange={handleChange}
          />
          {errors.Email && <p className="error">{errors.Email}</p>}

          <input
            className={errors.Password ? "error-input" : ""}
            type={visible ? "text" : "password"}
            placeholder="Password"
            name="Password"
            value={userData.Password}
            onChange={handleChange}
          />
          {errors.Password && <p className="error">{errors.Password}</p>}
          <div className="register-eye">
            <Eye visible={visible} setVisible={setVisible} />
          </div>
          <input
            className={errors.NIC ? "error-input" : ""}
            type="text"
            placeholder="NIC Number"
            name="NIC"
            value={userData.NIC}
            onChange={handleChange}
          />
          {errors.NIC && <p className="error">{errors.NIC}</p>}

          <input
            className={errors.Address ? "error-input" : ""}
            type="text"
            placeholder="Address"
            name="Address"
            value={userData.Address}
            onChange={handleChange}
          />
          {errors.Address && <p className="error">{errors.Address}</p>}

          <input
            className={errors.Mobile ? "error-input" : ""}
            type="text"
            placeholder="Mobile"
            name="Mobile"
            value={userData.Mobile}
            onChange={handleChange}
          />
          {errors.Mobile && <p className="error">{errors.Mobile}</p>}

          <button onClick={handleSubmit}>Register</button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
