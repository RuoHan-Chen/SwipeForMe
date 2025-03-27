import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MealSwipeCalculator from '../components/mealSwipeCalculator';

describe('MealSwipeCalculator Component', () => {
  test('renders calculator form', () => {
    render(<MealSwipeCalculator />);
    expect(screen.getByText('Meal Swipe Calculator')).toBeInTheDocument();
  });

  test('displays calculator fields', () => {
    render(<MealSwipeCalculator />);
    expect(screen.getByText('Last Day of School')).toBeInTheDocument();
    expect(screen.getByText('Current Swipes')).toBeInTheDocument();
    expect(screen.getByText('Days off Campus')).toBeInTheDocument();
    expect(screen.getByText('Swipes Per Day')).toBeInTheDocument();
    expect(screen.getByText('Swipes remaining')).toBeInTheDocument();
  });

  test('shows default values', () => {
    render(<MealSwipeCalculator />);
    expect(screen.getByText('2024/12/6')).toBeInTheDocument();
    expect(screen.getByDisplayValue('120')).toBeInTheDocument();
    expect(screen.getByText('20')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('40')).toBeInTheDocument();
  });

  test('handles input changes', () => {
    render(<MealSwipeCalculator />);
    const input = screen.getByTestId('swipes-input');
    
    fireEvent.change(input, { target: { value: '10' } });
    expect(input).toHaveValue(10);
  });
}); 