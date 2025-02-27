// Author: Jerry Wei
// Time spent: 1 hour

import React from "react";
import "../styles/profile.css";
import ProfileHeader from "../components/profileHeader";
import Rating from "../components/rating";
import MealSwipeCalculator from "../components/mealSwipeCalculator";

const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      <ProfileHeader />

      <div className="profile-sections">
        <div className="rating-container">
          <Rating />
        </div>
        <div className="calculator-container">
          <MealSwipeCalculator />
        </div>
      </div>
    </div>
  );
};

export default Profile;
