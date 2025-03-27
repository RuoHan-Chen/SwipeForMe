import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from '../components/rating';

describe('Rating Component', () => {
  test('renders rating stars', () => {
    render(<Rating />);
    const stars = screen.getAllByTestId('rating-star');
    expect(stars).toHaveLength(5);
  });

  test('displays rating value', () => {
    render(<Rating />);
    expect(screen.getByTestId('rating-value')).toBeInTheDocument();
  });

  test('shows community rating title', () => {
    render(<Rating />);
    expect(screen.getByText('Your Community Rating')).toBeInTheDocument();
  });

  test('displays rating description', () => {
    render(<Rating />);
    expect(screen.getByText(/Other users have rated your transactions/i)).toBeInTheDocument();
  });
}); 