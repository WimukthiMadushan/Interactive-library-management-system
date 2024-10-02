import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationModal from "../../Components/Modals/NotificationModal";
import axios from "axios";
import "./RegisterPage.css";

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

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showEmailValidation, setShowEmailValidation] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

  const handleCloseSuccess = () => setShowSuccess(false);
  const handleCloseError = () => setShowError(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // If the confirm password field is changed, update its state
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userData.Password !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      setShowError(true);
      return; // Exit the function if passwords don't match
    }

    try {
      await axios.post("http://localhost:5001/api/auth/register", userData);

      // Reset form after successful registration
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
      setConfirmPassword(""); // Reset confirm password field
      setModalMessage("Registration Successful.");
      setShowSuccess(true);
      navigate("/login");
    } catch (error) {
      setModalMessage("Registration Failed");
      setShowError(true);
    }
  };

  return (
    <div className="center-wrapper" data-testid="register-page">
      <div className="register-container">
        <div className="upper">
          <h1 data-testid="register-title">Sign Up</h1>
          <p title="This is a detailed description about the text.">Create your account to get started.</p>
        </div>

        <form onSubmit={handleSubmit} data-testid="register-form">
          <div className="name">
            <input
              type="text"
              placeholder="First Name"
              name="First_Name"
              value={userData.First_Name}
              onChange={handleChange}
              required
              pattern="[A-Za-z]+"
              data-testid="first-name-input"
            />

            <input
              type="text"
              placeholder="Last Name"
              name="Last_Name"
              value={userData.Last_Name}
              onChange={handleChange}
              required
              pattern="[A-Za-z]+"
              data-testid="last-name-input"
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
              data-testid="username-input"
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
              data-testid="email-input"
              onMouseEnter={() => setShowEmailValidation(true)}
              onMouseLeave={() => setShowEmailValidation(false)}
            />
          </div>

          <div className="password">
            <input
              type="password"
              placeholder="Password"
              name="Password"
              value={userData.Password}
              onChange={handleChange}
              required
              minLength={6}
              data-testid="password-input"
              onMouseEnter={() => setShowPasswordValidation(true)}
              onMouseLeave={() => setShowPasswordValidation(false)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              required
              minLength={6}
              data-testid="confirm-password-input"
            />
          </div>

          <div className="NIC">
            <input
              type="text"
              placeholder="NIC Number"
              name="NIC"
              value={userData.NIC}
              onChange={handleChange}
              required
              pattern="\d{9}[vVxX]|\d{12}"
              data-testid="nic-input"
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
              data-testid="address-input"
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
              pattern="\d{10}"
              data-testid="mobile-input"
            />
          </div>

          <div className="register-button">
            <button type="submit" data-testid="submit-button">
              Register
            </button>
          </div>
        </form>

        <NotificationModal
          show={showSuccess}
          handleClose={handleCloseSuccess}
          title={"Success"}
          message={modalMessage}
          isSuccess={true}
          data-testid="success-modal"
        />

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

export default Register;
