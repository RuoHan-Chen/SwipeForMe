import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../pages/Dashboard/Dashboard';
import { SnackbarProvider } from '../context/SnackbarContext';

// Mock the child components
jest.mock('../pages/Dashboard/Profile/Profile', () => {
  return function MockProfile({ viewMode }: { viewMode: string }) {
    return <div data-testid="profile-component">Profile Mode: {viewMode}</div>;
  };
});

jest.mock('../pages/Dashboard/Rating', () => {
  return function MockRating() {
    return <div data-testid="rating-component">Rating Component</div>;
  };
});

jest.mock('../pages/Dashboard/ActivityPanel/ActivityPanel', () => {
  return function MockActivityPanel({ viewMode }: { viewMode: string }) {
    return <div data-testid="activity-panel">Activity Panel Mode: {viewMode}</div>;
  };
});

// Mock the user client
jest.mock('../clients/userClient', () => ({
  getCurrentUser: jest.fn().mockResolvedValue({
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    profilePicUrl: 'test-url'
  })
}));

describe('Dashboard Component', () => {
  const renderDashboard = () => {
    return render(
      <BrowserRouter>
        <SnackbarProvider>
          <Dashboard />
        </SnackbarProvider>
      </BrowserRouter>
    );
  };

  test('renders all main components', async () => {
    await act(async () => {
      renderDashboard();
    });
    
    expect(screen.getByTestId('profile-component')).toBeInTheDocument();
    expect(screen.getByTestId('rating-component')).toBeInTheDocument();
    expect(screen.getByTestId('activity-panel')).toBeInTheDocument();
  });

  test('initializes with buyer view mode', async () => {
    await act(async () => {
      renderDashboard();
    });
    
    expect(screen.getByText('Profile Mode: buyer')).toBeInTheDocument();
    expect(screen.getByText('Activity Panel Mode: buyer')).toBeInTheDocument();
  });

  test('has correct layout styling', async () => {
    let container;
    await act(async () => {
      const result = renderDashboard();
      container = result.container;
    });
    
    const mainBox = container!.firstChild;
    expect(mainBox).toHaveStyle({
      backgroundColor: '#2e1a80',
      padding: '24px'
    });
  });
}); 