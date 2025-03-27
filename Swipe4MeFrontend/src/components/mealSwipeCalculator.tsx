// Author: Jerry Wei
// Time spent: 15 minutes

import React from "react";
import "../styles/profile.css";

const MealSwipeCalculator: React.FC = () => {
  const handleCalculate = () => {
    // Implementation of handleCalculate function
  };

  return (
    <div className="calculator-card" data-testid="calculator-form">
      <h3>Meal Swipe Calculator</h3>
      <table>
        <tbody>
          <tr>
            <td>Last Day of School</td>
            <td>2024/12/6</td>
          </tr>
          <tr>
            <td>Current Swipes</td>
            <td>
              <input 
                type="number" 
                defaultValue={120} 
                data-testid="swipes-input"
              />
            </td>
          </tr>
          <tr>
            <td>Days off Campus</td>
            <td>20</td>
          </tr>
          <tr>
            <td>Swipes Per Day</td>
            <td>2</td>
          </tr>
          <tr>
            <td>Swipes remaining</td>
            <td>40</td>
          </tr>
        </tbody>
      </table>
      <button 
        type="button"
        onClick={handleCalculate}
        aria-label="Calculate"
      >
        Calculate
      </button>
      <div data-testid="calculation-result">
        {/* calculation result content */}
      </div>
    </div>
  );
};

export default MealSwipeCalculator;
