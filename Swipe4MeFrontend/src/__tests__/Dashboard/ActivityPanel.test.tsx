import { render, screen } from '@testing-library/react';
import ActivityPanel from '../../pages/Dashboard/ActivityPanel/ActivityPanel';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from '../../context/SnackbarContext';

// Mock child components
jest.mock('../../pages/Dashboard/ActivityPanel/BuyerView/BuyerView', () => {
  return function MockBuyerView() {
    return <div data-testid="buyer-view">Buyer View</div>;
  };
});

jest.mock('../../pages/Dashboard/ActivityPanel/SellerView/SellerView', () => {
  return function MockSellerView() {
    return <div data-testid="seller-view">Seller View</div>;
  };
});

describe('ActivityPanel Component', () => {
  const renderActivityPanel = (viewMode: 'buyer' | 'seller') => {
    return render(
      <BrowserRouter>
        <SnackbarProvider>
          <ActivityPanel viewMode={viewMode} />
        </SnackbarProvider>
      </BrowserRouter>
    );
  };

  test('renders buyer view when in buyer mode', () => {
    renderActivityPanel('buyer');
    
    expect(screen.getByText('Your Swipe Sessions')).toBeInTheDocument();
    expect(screen.getByTestId('buyer-view')).toBeInTheDocument();
    expect(screen.queryByTestId('seller-view')).not.toBeInTheDocument();
  });

  test('renders seller view when in seller mode', () => {
    renderActivityPanel('seller');
    
    expect(screen.getByText('Your Availabilities')).toBeInTheDocument();
    expect(screen.getByTestId('seller-view')).toBeInTheDocument();
    expect(screen.queryByTestId('buyer-view')).not.toBeInTheDocument();
  });
}); 