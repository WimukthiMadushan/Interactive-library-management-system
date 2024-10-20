import React, { useEffect, useState } from "react";
import { useAuth } from "./../../Hooks/AuthContext";
import { Link } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import userImage from "./../../Images/Profile_pic.jpg";
import Hello from "./../../Images/Hello.png";

function UserProfile() {
  const [userDetails, setUserDetails] = useState({});

  const { authState } = useAuth();
  const { userId, role, username } = authState;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/user/${userId}`
        );
        setUserDetails(response.data);
        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching user details: ", error);
      }
    };
    fetchUserDetails();
  }, [userId]);

  return (
    <div className="user-profile-background">
      <div className="profile-container">
        <div className="profile-above">
          <div className="profile-left">
            <div className="welcome-message">
              <p>
                Hello {username}! <br />
                {role === "Administrator" || role === "Receptionist" ? (
                  <>You are a {role}</>
                ) : null}
              </p>
              <img src={Hello} alt="hello" />
            </div>
            <img src={userImage} alt="Profile" className="profile-image" />
            <p className="profile-username">@{userDetails.Username}</p>
          </div>
          <div className="profile-right">
            <h2 className="profile-name">
              {userDetails.First_Name} {userDetails.Last_Name}
            </h2>
            <span className="profile-email">
              {userDetails.Email} <br />
            </span>
            <span className="profile-address">
              {userDetails.Address} <br />
            </span>
            <span className="profile-registered">
              Joined on:{" "}
              {new Date(userDetails.Registered_Date).toLocaleDateString()}
            </span>
            <Link className="book-details-button" to={"/bookdetails"}>
              <button>Book Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
