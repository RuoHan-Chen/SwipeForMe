import React from "react";
import "../styles/profile.css";
import ProfileHeader from "../pages/profileHeader";
import Rating from "../components/rating";
import MealSwipeCalculator from "../components/mealSwipeCalculator";

const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      {/* Profile 头部信息，独占整行 */}
      <ProfileHeader />

      {/* 评分 + Meal Swipe Calculator */}
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
