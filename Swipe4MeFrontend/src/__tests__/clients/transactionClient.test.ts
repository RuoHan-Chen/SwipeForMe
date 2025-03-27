import {
  createTransaction,
  getCurrentUserTransactionsAsBuyer,
  getCurrentUserTransactionsAsSeller,
  acceptTransaction,
  cancelTransaction,
  TransactionStatus
} from '../../clients/transactionClient';
import { toEndpointUrl } from '../../clients/utils';

// Mock fetch
global.fetch = jest.fn();

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock toEndpointUrl
jest.mock('../../clients/utils', () => ({
  toEndpointUrl: jest.fn((path) => `http://localhost:8080${path}`)
}));

describe('transactionClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'test-token';
      if (key === 'userId') return '123';
      return null;
    });
  });

  describe('createTransaction', () => {
    test('creates a transaction with the correct parameters', async () => {
      const mockTransaction = { id: 1, status: TransactionStatus.PENDING };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockTransaction)
      });

      const request = {
        availabilityId: 1,
        buyerId: 123,
        sellerId: 456
      };
      
      const result = await createTransaction(request);

      expect(toEndpointUrl).toHaveBeenCalledWith(expect.stringContaining('/api/transactions?'));
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('availabilityId=1'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json'
          }
        })
      );
      expect(result).toEqual(mockTransaction);
    });

    test('throws an error when the API call fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false
      });

      const request = {
        availabilityId: 1,
        buyerId: 123,
        sellerId: 456
      };

      await expect(createTransaction(request)).rejects.toThrow('Failed to create transaction');
    });
  });

  describe('getCurrentUserTransactionsAsBuyer', () => {
    test('fetches transactions where the current user is the buyer', async () => {
      const mockTransactions = [
        { id: 1, status: TransactionStatus.PENDING }
      ];
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockTransactions)
      });

      const result = await getCurrentUserTransactionsAsBuyer();

      expect(toEndpointUrl).toHaveBeenCalledWith('/api/transactions/buyer/123');
      expect(result).toEqual(mockTransactions);
    });

    test('throws an error when user ID is not found', async () => {
      localStorageMock.getItem.mockImplementation(() => null);

      await expect(getCurrentUserTransactionsAsBuyer()).rejects.toThrow('User ID not found');
    });
  });

  describe('getCurrentUserTransactionsAsSeller', () => {
    test('fetches transactions where the current user is the seller', async () => {
      const mockTransactions = [
        { id: 1, status: TransactionStatus.PENDING }
      ];
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockTransactions)
      });

      const result = await getCurrentUserTransactionsAsSeller();

      expect(toEndpointUrl).toHaveBeenCalledWith('/api/transactions/seller/123');
      expect(result).toEqual(mockTransactions);
    });
  });

  describe('acceptTransaction', () => {
    test('updates a transaction status to IN_PROGRESS', async () => {
      const mockTransaction = { id: 1, status: TransactionStatus.IN_PROGRESS };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockTransaction)
      });

      const result = await acceptTransaction(1);

      expect(toEndpointUrl).toHaveBeenCalledWith(expect.stringContaining('/api/transactions/1/status?'));
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`status=${TransactionStatus.IN_PROGRESS}`),
        expect.objectContaining({
          method: 'PUT',
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json'
          }
        })
      );
      expect(result).toEqual(mockTransaction);
    });
  });

  describe('cancelTransaction', () => {
    test('updates a transaction status to REJECTED', async () => {
      const mockTransaction = { id: 1, status: TransactionStatus.REJECTED };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockTransaction)
      });

      const result = await cancelTransaction(1);

      expect(toEndpointUrl).toHaveBeenCalledWith(expect.stringContaining('/api/transactions/1/status?'));
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining(`status=${TransactionStatus.REJECTED}`),
        expect.objectContaining({
          method: 'PUT'
        })
      );
      expect(result).toEqual(mockTransaction);
    });
  });
}); 