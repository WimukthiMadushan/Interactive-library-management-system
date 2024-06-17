import React from "react";
import "./../Styles/UserProfile.css";
import userImage from "./../Images/Profile_pic.jpg";

function UserProfile() {
  const userDetails = {
    username: "W.G.W.M Bandara",
  };
  return (
    <div className="profile-container">
      <h1>Hi, {userDetails.username}</h1>
      <div className="left">
        <img src={userImage} alt="h" className="profile-image" />
      </div>
      <div className="right">
        {/*<p>{userDetails}</p>*/}
        <button className="edit-profile-button">Edit Profile</button>
      </div>
    </div>
  );
}

export default UserProfile;
