import React from "react";
import "../styles/profile.css";

const MealSwipeCalculator: React.FC = () => {
  return (
    <div className="calculator-card">
      <h3>Meal Swipe Calculator</h3>
      <table>
        <tbody>
          <tr>
            <td>Last Day of School</td>
            <td>2024/12/6</td>
          </tr>
          <tr>
            <td>Current Swipes</td>
            <td>120</td>
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
    </div>
  );
};

export default MealSwipeCalculator;
