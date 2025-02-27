// Author: Jerry Wei
// Time spent: 15 minutes

import React from "react";
import "../styles/profile.css";

const Rating: React.FC = () => {
  return (
    <div className="rating-card">
      <h3>Your Community Rating</h3>
      <p>
        Other users have rated your transactions based on punctuality,
        politeness, and overall experience.
      </p>

      <div className="rating-score">
        <span className="rating-value">4.5</span>
        <span className="stars">⭐⭐⭐⭐⭐</span>
        <span className="rating-count">256</span>
      </div>

      <div className="rating-bars">
        <div className="rating-bar">
          <span>5</span>
          <div className="bar full"></div>
        </div>
        <div className="rating-bar">
          <span>4</span>
          <div className="bar medium"></div>
        </div>
        <div className="rating-bar">
          <span>3</span>
          <div className="bar short"></div>
        </div>
        <div className="rating-bar">
          <span>2</span>
          <div className="bar very-short"></div>
        </div>
        <div className="rating-bar">
          <span>1</span>
          <div className="bar min"></div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
