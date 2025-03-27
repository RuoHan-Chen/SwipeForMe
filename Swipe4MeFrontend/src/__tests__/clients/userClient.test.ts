import { getCurrentUser } from '../../clients/userClient';
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

// Mock console.log
console.log = jest.fn();

// Mock toEndpointUrl
jest.mock('../../clients/utils', () => ({
  toEndpointUrl: jest.fn((path) => `http://localhost:8080${path}`)
}));

describe('userClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockImplementation((key) => {
      if (key === 'token') return 'test-token';
      return null;
    });
  });

  describe('getCurrentUser', () => {
    test('fetches the current user with the correct headers', async () => {
      const mockUser = {
        id: 123,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockUser)
      });

      const result = await getCurrentUser();

      expect(toEndpointUrl).toHaveBeenCalledWith('/api/users/me');
      expect(fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json'
          }
        })
      );
      expect(result).toEqual(mockUser);
      expect(console.log).toHaveBeenCalledWith(mockUser);
    });

    test('throws an error when the API call fails', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        json: jest.fn().mockRejectedValueOnce(new Error('Unauthorized'))
      });

      await expect(getCurrentUser()).rejects.toThrow();
    });
  });
}); 