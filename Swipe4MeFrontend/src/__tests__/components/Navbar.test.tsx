import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/navbar';
import { AuthProvider } from '../../context/AuthContext';

// Mock the useAuth hook
jest.mock('../../context/AuthContext', () => {
  const originalModule = jest.requireActual('../../context/AuthContext');
  return {
    ...originalModule,
    useAuth: jest.fn()
  };
});

describe('Navbar Component', () => {
  const mockUseAuth = require('../../context/AuthContext').useAuth;
  const mockLogout = jest.fn();
  const mockNavigate = jest.fn();

  // Mock useNavigate
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
        </AuthProvider>
      </BrowserRouter>
    );
  };

  test('renders brand logo and name', () => {
    // Mock logged out state
    mockUseAuth.mockReturnValue({
      isLoggedIn: false,
      logout: mockLogout
    });

    renderNavbar();
    
    expect(screen.getByText('SWIPE4ME')).toBeInTheDocument();
    expect(screen.getByAltText('Swipe4Me Logo')).toBeInTheDocument();
  });

  test('renders "Get Started" button when logged out', () => {
    // Mock logged out state
    mockUseAuth.mockReturnValue({
      isLoggedIn: false,
      logout: mockLogout
    });

    renderNavbar();
    
    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(screen.queryByText('Get Swipes')).not.toBeInTheDocument();
    expect(screen.queryByText('Donate Swipes')).not.toBeInTheDocument();
    expect(screen.queryByText('Transaction History')).not.toBeInTheDocument();
  });

  test('renders navigation links when logged in', () => {
    // Mock logged in state
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      logout: mockLogout
    });

    renderNavbar();
    
    expect(screen.getByText('Get Swipes')).toBeInTheDocument();
    expect(screen.getByText('Donate Swipes')).toBeInTheDocument();
    expect(screen.getByText('Transaction History')).toBeInTheDocument();
    expect(screen.queryByText('Get Started')).not.toBeInTheDocument();
  });

  test('shows profile dropdown when clicked', () => {
    // Mock logged in state
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      logout: mockLogout
    });

    renderNavbar();
    
    // Find and click the profile image
    const profileImage = screen.getByAltText('User Profile');
    fireEvent.click(profileImage);
    
    // Check that dropdown menu appears
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('calls logout when logout button is clicked', () => {
    // Mock logged in state
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      logout: mockLogout
    });

    renderNavbar();
    
    // Open dropdown
    const profileImage = screen.getByAltText('User Profile');
    fireEvent.click(profileImage);
    
    // Click logout button
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    // Check that logout was called
    expect(mockLogout).toHaveBeenCalled();
  });

  test('navigates to dashboard when dashboard button is clicked', () => {
    // Mock logged in state and useNavigate
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      logout: mockLogout
    });

    renderNavbar();
    
    // Open dropdown
    const profileImage = screen.getByAltText('User Profile');
    fireEvent.click(profileImage);
    
    // Click dashboard button
    const dashboardButton = screen.getByText('Dashboard');
    fireEvent.click(dashboardButton);
    
    // Check that dropdown is closed
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  test('closes dropdown when clicking outside', () => {
    // Mock logged in state
    mockUseAuth.mockReturnValue({
      isLoggedIn: true,
      logout: mockLogout
    });

    renderNavbar();
    
    // Open dropdown
    const profileImage = screen.getByAltText('User Profile');
    fireEvent.click(profileImage);
    
    // Check dropdown is open
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    
    // Click outside the dropdown
    fireEvent.mouseDown(document.body);
    
    // Check dropdown is closed
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });
}); 