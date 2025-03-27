import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from '../../pages/Dashboard/Rating';

describe('Rating Component', () => {
  test('renders rating display', () => {
    render(<Rating />);
    expect(screen.getByText('4.5')).toBeInTheDocument();
  });

  test('renders stars', () => {
    render(<Rating />);
    const stars = screen.getAllByTestId('StarIcon');
    expect(stars.length).toBe(5);
  });

  test('renders rating distribution', () => {
    render(<Rating />);
    expect(screen.getByText('Your Community Rating')).toBeInTheDocument();
    expect(screen.getByText(/Based on punctuality/i)).toBeInTheDocument();
  });

  test('renders rating count', () => {
    render(<Rating />);
    expect(screen.getByText('256 ratings')).toBeInTheDocument();
  });
}); 