import { 
  getAllAvailabilities, 
  getAvailabilityByUserId, 
  getCurrentUserAvailability,
  createAvailability,
  deleteAvailability
} from '../../clients/availabilityClient';
import { toEndpointUrl } from '../../clients/utils';
import { DiningLocation } from '../../types';

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

describe('availabilityClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'test-token';
      if (key === 'userId') return '123';
      return null;
    });
  });

  describe('getAllAvailabilities', () => {
    test('fetches all availabilities with the correct headers', async () => {
      const mockAvailabilities = [
        { id: 1, location: DiningLocation.RAND, startTime: '2023-01-01T12:00:00Z', endTime: '2023-01-01T13:00:00Z' },
        { id: 2, location: DiningLocation.COMMONS, startTime: '2023-01-02T12:00:00Z', endTime: '2023-01-02T13:00:00Z' }
      ];
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockAvailabilities)
      });

      const result = await getAllAvailabilities();

      expect(toEndpointUrl).toHaveBeenCalledWith('/api/availabilities');
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json'
          }
        })
      );
      expect(result).toEqual(mockAvailabilities);
    });
  });

  describe('getAvailabilityByUserId', () => {
    test('fetches availabilities for a specific user', async () => {
      const mockAvailabilities = [
        { id: 1, location: DiningLocation.RAND, startTime: '2023-01-01T12:00:00Z', endTime: '2023-01-01T13:00:00Z' }
      ];
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockAvailabilities)
      });

      const userId = 123;
      const result = await getAvailabilityByUserId(userId);

      expect(toEndpointUrl).toHaveBeenCalledWith(`/api/availabilities/user/${userId}`);
      expect(result).toEqual(mockAvailabilities);
    });

    test('throws an error when the API call fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(getAvailabilityByUserId(999)).rejects.toThrow('Failed to get availability by user ID');
    });
  });

  describe('getCurrentUserAvailability', () => {
    test('fetches availabilities for the current user', async () => {
      const mockAvailabilities = [
        { id: 1, location: DiningLocation.RAND, startTime: '2023-01-01T12:00:00Z', endTime: '2023-01-01T13:00:00Z' }
      ];
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockAvailabilities)
      });

      const result = await getCurrentUserAvailability();

      expect(toEndpointUrl).toHaveBeenCalledWith('/api/availabilities/user/123');
      expect(result).toEqual(mockAvailabilities);
    });

    test('throws an error when user ID is not found', async () => {
      localStorageMock.getItem.mockImplementation(() => null);

      await expect(getCurrentUserAvailability()).rejects.toThrow('User ID not found');
    });
  });

  describe('createAvailability', () => {
    test('creates a new availability with the correct parameters', async () => {
      const mockAvailability = {
        id: 1,
        location: DiningLocation.RAND,
        startTime: '2023-01-01T12:00:00Z',
        endTime: '2023-01-01T13:00:00Z'
      };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockAvailability)
      });

      const request = {
        userId: 123,
        location: DiningLocation.RAND,
        startTime: '2023-01-01T12:00:00Z',
        endTime: '2023-01-01T13:00:00Z'
      };
      
      const result = await createAvailability(request);

      expect(toEndpointUrl).toHaveBeenCalledWith(expect.stringContaining('/api/availabilities?'));
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('userId=123'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json'
          }
        })
      );
      expect(result).toEqual(mockAvailability);
    });
  });

  describe('deleteAvailability', () => {
    test('deletes an availability by ID', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true
      });

      await deleteAvailability(1);

      expect(toEndpointUrl).toHaveBeenCalledWith('/api/availabilities/1');
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: 'DELETE',
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json'
          },
          body: '{}'
        })
      );
    });

    test('throws an error when the API call fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(deleteAvailability(999)).rejects.toThrow('Failed to delete availability');
    });
  });
}); 