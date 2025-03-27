import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/dashboard';
import { BrowserRouter } from 'react-router-dom';

// Mock the child components
jest.mock('../components/profileHeader', () => {
  return function MockProfileHeader() {
    return <div data-testid="mock-profile-header">Profile Header</div>;
  };
});

jest.mock('../components/rating', () => {
  return function MockRating() {
    return <div data-testid="mock-rating">Rating Component</div>;
  };
});

jest.mock('../components/mealSwipeCalculator', () => {
  return function MockMealSwipeCalculator() {
    return <div data-testid="mock-meal-calculator">Meal Calculator</div>;
  };
});

describe('Dashboard Component', () => {
  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  };

  test('renders the dashboard container', () => {
    renderDashboard();
    expect(screen.getByTestId('dashboard-container')).toBeInTheDocument();
  });

  test('renders all child components', () => {
    renderDashboard();
    expect(screen.getByTestId('mock-profile-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-rating')).toBeInTheDocument();
    expect(screen.getByTestId('mock-meal-calculator')).toBeInTheDocument();
  });

  test('has correct layout structure', () => {
    const { container } = renderDashboard();
    expect(container.querySelector('.profile-sections')).toBeInTheDocument();
    expect(container.querySelector('.rating-container')).toBeInTheDocument();
    expect(container.querySelector('.calculator-container')).toBeInTheDocument();
  });
}); 