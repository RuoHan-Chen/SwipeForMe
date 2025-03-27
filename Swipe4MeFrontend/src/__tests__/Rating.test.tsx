import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Rating from '../pages/rating';

describe('Rating Component', () => {
  const renderRating = () => {
    return render(<Rating />);
  };

  test('renders success message', () => {
    renderRating();
    expect(screen.getByText('Success! Your Swipe Found a Match')).toBeInTheDocument();
  });

  test('renders all rating categories', () => {
    renderRating();
    expect(screen.getByText('Punctuality')).toBeInTheDocument();
    expect(screen.getByText('Friendliness & Politeness')).toBeInTheDocument();
    expect(screen.getByText('Overall Satisfaction')).toBeInTheDocument();
  });

  test('renders star ratings for each category', () => {
    renderRating();
    // Each category has 5 stars
    const stars = screen.getAllByTestId('star-icon');
    expect(stars.length).toBe(15); // 3 categories * 5 stars
  });

  test('renders action buttons', () => {
    renderRating();
    expect(screen.getByText('Submit')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Skip')).toBeInTheDocument();
  });

  test('allows rating selection', () => {
    renderRating();
    const stars = screen.getAllByTestId('star-icon');
    
    // Click the third star in the first category
    fireEvent.click(stars[2]);
    
    // Verify the first three stars are selected
    expect(stars[0]).toHaveClass('selected');
    expect(stars[1]).toHaveClass('selected');
    expect(stars[2]).toHaveClass('selected');
    expect(stars[3]).not.toHaveClass('selected');
  });
}); 