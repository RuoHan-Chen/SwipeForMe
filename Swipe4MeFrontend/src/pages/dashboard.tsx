// Author: Jerry Wei
// Time spent: 1 hour

import React from "react";
import "../styles/profile.css";
import ProfileHeader from "../components/profileHeader";
import Rating from "../components/rating";
import MealSwipeCalculator from "../components/mealSwipeCalculator";

const Dashboard: React.FC = () => {
  return (
    <div className="profile-container" data-testid="dashboard-container">
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

export default Dashboard;
