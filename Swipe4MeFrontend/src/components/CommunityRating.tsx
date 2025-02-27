// Author: Jerry Wei
// Time spent: 1 hour

import React from "react";

interface CommunityRatingProps {
  rating: number;
  totalRatings: number;
}

const CommunityRating: React.FC<CommunityRatingProps> = ({
  rating,
  totalRatings,
}) => {
  const ratingBars = [5, 4, 3, 2, 1].map((value) => ({
    value,
    percentage: Math.random() * 100, // 这里应该使用实际数据
  }));

  return (
    <div className="community-rating-card">
      <h2>Your Community Rating</h2>
      <p className="rating-description">
        Other users have rated your transactions based on punctuality,
        politeness, and overall experience.
      </p>

      <div className="rating-overview">
        <div className="rating-number">
          <h1>{rating}</h1>
          <div className="stars">
            {"★".repeat(Math.floor(rating))}
            {"☆".repeat(5 - Math.floor(rating))}
          </div>
          <span className="total-ratings">{totalRatings}</span>
        </div>

        <div className="rating-bars">
          {ratingBars.map((bar) => (
            <div key={bar.value} className="rating-bar-row">
              <span>{bar.value}</span>
              <div className="bar-container">
                <div
                  className="bar-fill"
                  style={{ width: `${bar.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityRating;
