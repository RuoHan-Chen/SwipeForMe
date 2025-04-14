// Author: RuoHan Chen
// Time spent: 15 minutes

import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import "../styles/rating.css";
import { useNavigate, useLocation } from "react-router-dom";
import { createRating } from "../clients/ratingClient";
import { Transaction } from "../types";
import { TransactionStatus } from "../clients/transactionClient";

interface RatingCategory {
  label: string;
  description: string;
  name: string;
}

const categories: RatingCategory[] = [
  {
    name: "punctuality",
    label: "Punctuality",
    description:
      "Did the user arrive on time and complete the transaction as agreed?",
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
  const navigate = useNavigate();
  const location = useLocation();
  const transaction = location.state?.transaction as Transaction;
  const [ratings, setRatings] = useState<Record<string, number>>({
    punctuality: 0,
    friendliness: 0,
    satisfaction: 0,
  });

  const handleRatingChange = (category: string, value: number) => {
    setRatings((prev) => ({ ...prev, [category]: value }));
  };

  const calculateAverageRating = () => {
    const values = Object.values(ratings);
    return values.reduce((a, b) => a + b, 0) / values.length;
  };

  const handleSubmit = async () => {
    try {
      if (!transaction) {
        throw new Error("No transaction data found");
      }

      const averageRating = calculateAverageRating();
      
      // Determine if current user is buyer or seller
      const isBuyer = transaction.buyer.id === parseInt(localStorage.getItem("userId") || "0");
      
      await createRating({
        transactionId: transaction.id,
        toSellerRating: isBuyer ? averageRating : 0,
        toBuyerRating: !isBuyer ? averageRating : 0,
      });

      // Update transaction status to completed
      await updateTransactionStatus(transaction.id, TransactionStatus.COMPLETED);
      
      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to submit rating:", error);
    }
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
                      data-testid="star-icon"
                      className={
                        ratings[cat.name] >= i ? "star selected" : "star"
                      }
                      onClick={() => handleRatingChange(cat.name, i)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="feedback-buttons">
            <button
              className="cancel-button"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rating;
