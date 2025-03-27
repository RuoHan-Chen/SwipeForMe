import React from 'react';
import { render, screen } from '@testing-library/react';
import BuySwipes from '../pages/buySwipes';

describe('BuySwipes Component', () => {
  test('renders coming soon message', () => {
    render(<BuySwipes />);
    
    expect(screen.getByText('buySwipes Coming Soon')).toBeInTheDocument();
    expect(screen.getByText('This page is under construction. Check back later!')).toBeInTheDocument();
  });

  test('has correct styling classes', () => {
    const { container } = render(<BuySwipes />);
    
    expect(container.querySelector('.filler-container')).toBeInTheDocument();
    expect(container.querySelector('.filler-title')).toBeInTheDocument();
    expect(container.querySelector('.filler-text')).toBeInTheDocument();
  });
}); 