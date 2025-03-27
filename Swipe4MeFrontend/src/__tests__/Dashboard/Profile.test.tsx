import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Profile from '../../pages/Dashboard/Profile/Profile';
import { BrowserRouter } from 'react-router-dom';

describe('Profile Component', () => {
  const mockUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    profilePicUrl: 'test-url'
  };

  const renderProfile = (viewMode: string = 'buyer') => {
    return render(
      <BrowserRouter>
        <Profile viewMode={viewMode} user={mockUser} onViewModeChange={() => {}} />
      </BrowserRouter>
    );
  };

  test('renders user information', () => {
    renderProfile();
    
    expect(screen.getByText('Hi, Test')).toBeInTheDocument();
    expect(screen.getByText('test@example.com')).toBeInTheDocument();
  });

  test('renders view mode options', () => {
    renderProfile();
    
    expect(screen.getByText('Get Swipes')).toBeInTheDocument();
    expect(screen.getByText('Donate Swipes')).toBeInTheDocument();
  });

  test('renders edit button', () => {
    renderProfile();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  test('renders user avatar', () => {
    renderProfile();
    const avatar = screen.getByAltText('Test User');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'test-url');
  });
}); 