import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GetSwipes from '../pages/getSwipes';
import { SnackbarProvider } from '../context/SnackbarContext';
import { getAllAvailabilities } from '../clients/availabilityClient';
import { getCurrentUserTransactionsAsBuyer } from '../clients/transactionClient';
import { DiningLocation } from '../types';

// Mock the modules
jest.mock('../clients/availabilityClient');
jest.mock('../clients/transactionClient');
jest.mock('../clients/userClient');

// Mock the utils module with environment variables
jest.mock('../clients/utils', () => ({
  toEndpointUrl: jest.fn((path) => `http://localhost:3000${path}`),
  __esModule: true,
  default: {
    VITE_API_URL: 'http://localhost:3000',
    PROD: false,
    DEV: true,
  }
}));

// Mock environment variables
process.env.VITE_API_URL = 'http://localhost:3000';

const mockAvailabilities = [
  {
    id: 1,
    user: {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@vanderbilt.edu',
      rating: 4.5,
    },
    location: 'RAND',
    startTime: '2024-03-28T12:00:00Z',
    endTime: '2024-03-28T13:00:00Z',
  },
  {
    id: 2,
    user: {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@vanderbilt.edu',
      rating: 4.0,
    },
    location: 'COMMONS',
    startTime: '2024-03-28T14:00:00Z',
    endTime: '2024-03-28T15:00:00Z',
  },
];

describe('GetSwipes Component', () => {
  beforeEach(() => {
    (getAllAvailabilities as jest.Mock).mockResolvedValue(mockAvailabilities);
    (getCurrentUserTransactionsAsBuyer as jest.Mock).mockResolvedValue([]);
    jest.clearAllMocks();
  });

  const renderGetSwipes = async () => {
    let component;
    await act(async () => {
      component = render(
        <BrowserRouter>
          <SnackbarProvider>
            <GetSwipes />
          </SnackbarProvider>
        </BrowserRouter>
      );
    });
    return component;
  };

  test('renders table headers correctly', async () => {
    await renderGetSwipes();
    
    expect(screen.getByText(/Student Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Dining Hall/i)).toBeInTheDocument();
    expect(screen.getByText(/Available Time/i)).toBeInTheDocument();
    expect(screen.getByText(/Date/i)).toBeInTheDocument();
    expect(screen.getByText(/Email/i)).toBeInTheDocument();
    expect(screen.getByText(/Rating/i)).toBeInTheDocument();
  });

  test('shows no students message when no availabilities', async () => {
    (getAllAvailabilities as jest.Mock).mockResolvedValue([]);
    await renderGetSwipes();
    
    expect(screen.getByText(/No Students are available at this time/i)).toBeInTheDocument();
  });
}); 