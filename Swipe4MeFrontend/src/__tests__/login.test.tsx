import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../pages/login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from '../context/AuthContext';

// Mock the GoogleLogin component
jest.mock('@react-oauth/google', () => ({
  ...jest.requireActual('@react-oauth/google'),
  GoogleLogin: () => <div data-testid="google-login">Google Login Button</div>
}));

// Mock the auth client
jest.mock('../clients/authClient', () => ({
  googleSignIn: jest.fn().mockResolvedValue({ token: 'test-token', userId: '1' }),
}));

// Mock the user client
jest.mock('../clients/userClient', () => ({
  getCurrentUser: jest.fn().mockResolvedValue({ id: 1, name: 'Test User' }),
}));

describe('Login Component', () => {
  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <GoogleOAuthProvider clientId="test-client-id">
            <Login />
          </GoogleOAuthProvider>
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('renders sign up heading', () => {
    renderLogin();
    expect(screen.getByText('Sign Up Now')).toBeInTheDocument();
  });

  test('renders Google login button', () => {
    renderLogin();
    expect(screen.getByTestId('google-login')).toBeInTheDocument();
  });

  test('has correct styling', () => {
    const { container } = renderLogin();
    const paper = container.querySelector('.MuiPaper-root');
    expect(paper).toHaveStyle({
      backgroundColor: 'background.paper'
    });
  });
}); 