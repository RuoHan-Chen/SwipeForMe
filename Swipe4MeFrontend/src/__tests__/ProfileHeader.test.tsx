import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfileHeader from '../components/profileHeader';

describe('ProfileHeader Component', () => {
  test('renders user information', () => {
    render(<ProfileHeader />);
    
    // Test for user name display
    expect(screen.getByTestId('user-name')).toBeInTheDocument();
    
    // Test for profile image
    expect(screen.getByAltText('Profile Picture')).toBeInTheDocument();
    
    // Test for user stats if they exist
    expect(screen.getByTestId('user-stats')).toBeInTheDocument();
  });

  test('displays correct user information', () => {
    render(<ProfileHeader />);
    const statsContainer = screen.getByTestId('user-stats');
    expect(statsContainer).toHaveTextContent(/Email:/i);
    expect(statsContainer).toHaveTextContent(/Class:/i);
    expect(statsContainer).toHaveTextContent(/Age:/i);
    expect(statsContainer).toHaveTextContent(/Phone Number:/i);
  });

  test('renders edit profile button', () => {
    render(<ProfileHeader />);
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
  });
}); 