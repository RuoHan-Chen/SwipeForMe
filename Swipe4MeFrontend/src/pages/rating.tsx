// Author: RuoHan Chen
// Time spent: 15 minutes

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../styles/rating.css";

interface RatingCategory {
  label: string;
  description: string;
  name: string;
}

const categories: RatingCategory[] = [
  {
    name: "punctuality",
    label: "Punctuality",
    description: "Did the user arrive on time and complete the transaction as agreed?",
  },
  {
    name: "friendliness",
    label: "Friendliness & Politeness",
    description: "Was the user respectful and pleasant during the exchange?",
  },
  {
    name: "satisfaction",
    label: "Overall Satisfaction",
    description: "Would you choose to transact with this person again?",
  },
];

const Rating: React.FC = () => {
  const [ratings, setRatings] = useState<Record<string, number>>({
    punctuality: 0,
    friendliness: 0,
    satisfaction: 0,
  });

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted ratings:", ratings);
    // Submit logic here
  };

  return (
    <div className="rating-background">
      <div className="rating-stack">
        <h1 className="subtitle">Success! Your Swipe Found a Match</h1>
        <h3 className="text">
          Help us build trust in the community with your quick feedback. Your
          ratings help others feel safe and confident when exchanging swipes —
          and they keep our community respectful, reliable, and kind.
        </h3>

        <div className="feedback-modal">
          <div className="feedback-modal-header">
            <h2>Rate Your Experience!</h2>
          </div>

          <div className="feedback-categories">
            {categories.map((cat) => (
              <div key={cat.name} className="feedback-category">
                <h3>{cat.label}</h3>
                <p>{cat.description}</p>
                <div className="feedback-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar
                      key={i}
                      className={ratings[cat.name] >= i ? "star selected" : "star"}
                      onClick={() => handleRatingChange(cat.name, i)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="feedback-buttons">
            <button className="cancel-button">Cancel</button>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <br></br>
        <button className="skip-button">
            Skip
        </button>
      </div>
    </div>
  );
};

export default Rating;
