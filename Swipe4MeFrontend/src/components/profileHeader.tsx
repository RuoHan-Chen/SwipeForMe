// Author: Jerry Wei
// Time spent: 15 minutes

import React from "react";
import "../styles/profile.css";

const ProfileHeader: React.FC = () => {
  return (
    <div className="profile-header">
      <div className="profile-card">
        <div className="profile-photo-container">
          <img src="/profile_pic.png" alt="Profile" className="profile-photo" />
        </div>

        <div className="profile-details">
          <div className="profile-header-row">
            <h2 className="user-name">RuoHan Chen</h2>
            <div className="profile-actions">
              <img
                src="/notification-icon.png"
                alt="Notification"
                className="notification-icon"
              />
              <button className="edit-profile-btn">Edit Profile</button>
            </div>
          </div>

          <div className="profile-info">
            <div className="profile-column">
              <p>
                <strong>Email:</strong> ruohan@gmail.com
              </p>
              <p>
                <strong>Class:</strong> Sophomore
              </p>
            </div>
            <div className="profile-column">
              <p>
                <strong>Age:</strong> 21
              </p>
              <p>
                <strong>Phone Number:</strong> +1 7306185390
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
