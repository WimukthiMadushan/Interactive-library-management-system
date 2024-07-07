import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Eye from "../Components/Eye";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../Styles/RegisterPage.css";
import Register_Img from "./../Images/user.png";

function Register() {
  const [userData, setUserData] = useState({
    First_Name: "",
    Last_Name: "",
    Username: "",
    Password: "",
    Email: "",
    Address: "",
    NIC: "",
    Mobile: "",
  });
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

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
      await axios.post("http://localhost:5000/api/auth/register", userData);
      toast.success("Registration Successful", {
        closeButton: false,
      });

      // Reset form data
      setUserData({
        First_Name: "",
        Last_Name: "",
        Username: "",
        Password: "",
        Email: "",
        Address: "",
        NIC: "",
        Mobile: "",
      });

      // Navigate to login page
      navigate("/login");
    } catch (error) {
      console.error("Registration failed", error);
      toast.error("Registration failed. Please try again.", {
        closeButton: false,
      });
    }
  };

  return (
    <div className="center-wrapper">
      <div className="register-container">
        <div className="upper">
          <div className="user_icon">
            <img src={Register_Img} alt="User" />
          </div>
          <h1>Member Sign Up</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="name">
            <input
              type="text"
              placeholder="First Name"
              name="First_Name"
              value={userData.First_Name}
              onChange={handleChange}
              required
              pattern="[A-Za-z]+"
            />

            <input
              type="text"
              placeholder="Last Name"
              name="Last_Name"
              value={userData.Last_Name}
              onChange={handleChange}
              required
              pattern="[A-Za-z]+"
            />
          </div>

          <div className="username" style={{ marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Username"
              name="Username"
              value={userData.Username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="email-password">
            <input
              type="email"
              placeholder="Email"
              name="Email"
              value={userData.Email}
              onChange={handleChange}
              required
            />

            <input
              type={visible ? "text" : "password"}
              placeholder="Password"
              name="Password"
              value={userData.Password}
              onChange={handleChange}
              required
              minLength={6}
            />
            <div className="register-eye">
              <Eye visible={visible} setVisible={setVisible} />
            </div>
          </div>

          <div className="NIC">
            <input
              type="text"
              placeholder="NIC Number"
              name="NIC"
              value={userData.NIC}
              onChange={handleChange}
              required
              pattern="\d{9}[vVxX]|\d{12}" // Regex to validate NIC format.
            />
          </div>

          <div className="address">
            <input
              type="text"
              placeholder="Address"
              name="Address"
              value={userData.Address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mobile">
            <input
              type="text"
              placeholder="Mobile"
              name="Mobile"
              value={userData.Mobile}
              onChange={handleChange}
              required
              pattern="\d{10}" // Simple pattern to accept 10 digit mobile numbers.
            />
          </div>

          <div className="register-button">
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
