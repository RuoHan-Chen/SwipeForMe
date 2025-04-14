import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BuyerView from '../../../pages/Dashboard/ActivityPanel/BuyerView/BuyerView';
import { SnackbarProvider } from '../../../context/SnackbarContext';
import { getCurrentUserTransactionsAsBuyer } from '../../../clients/transactionClient';
import { DiningLocation } from '../../../types.ts';

// Mock the transaction client
jest.mock('../../../clients/transactionClient', () => ({
  getCurrentUserTransactionsAsBuyer: jest.fn()
}));

const mockTransactions = [
  {
    id: 1,
    availability: {
      id: 1,
      location: DiningLocation.RAND,
      startTime: '2024-03-28T12:00:00Z',
      endTime: '2024-03-28T13:00:00Z',
      user: {
        id: 2,
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@vanderbilt.edu',
        rating: 4.5
      }
    },
    status: 'PENDING'
  }
];

describe('BuyerView Component', () => {
  beforeEach(() => {
    (getCurrentUserTransactionsAsBuyer as jest.Mock).mockResolvedValue(mockTransactions);
  });

  const renderBuyerView = () => {
    return render(
      <BrowserRouter>
        <SnackbarProvider>
          <BuyerView viewMode="buyer" formatDuration={() => ''} />
        </SnackbarProvider>
      </BrowserRouter>
    );
  };

  test('displays no transactions message when empty', async () => {
    (getCurrentUserTransactionsAsBuyer as jest.Mock).mockResolvedValue([]);
    renderBuyerView();
    
    expect(await screen.findByText(/No pending confirmation transactions/i)).toBeInTheDocument();
  });

  test('handles error state', async () => {
    (getCurrentUserTransactionsAsBuyer as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    renderBuyerView();
    
    expect(await screen.findByText(/Failed to fetch transactions/i)).toBeInTheDocument();
  });
}); 