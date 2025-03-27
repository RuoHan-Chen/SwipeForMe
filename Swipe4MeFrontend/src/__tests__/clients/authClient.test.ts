import { googleSignIn } from '../../clients/authClient';
import { toEndpointUrl } from '../../clients/utils';

// Mock fetch
global.fetch = jest.fn();

// Mock toEndpointUrl
jest.mock('../../clients/utils', () => ({
  toEndpointUrl: jest.fn((path) => `http://localhost:8080${path}`)
}));

describe('authClient', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('googleSignIn', () => {
    test('calls the correct endpoint with the provided token', async () => {
      // Mock successful response
      const mockResponse = {
        token: 'test-token',
        userId: 123
      };
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      });

      const idToken = 'google-id-token';
      const result = await googleSignIn(idToken);

      // Check that fetch was called with the correct URL and options
      expect(toEndpointUrl).toHaveBeenCalledWith('/api/auth/oauth2/google/login?');
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('id_token=google-id-token'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        })
      );

      // Check that the response was correctly processed
      expect(result).toEqual(mockResponse);
    });

    test('throws an error when the API call fails', async () => {
      // Mock failed response
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        statusText: 'Bad Request',
        json: jest.fn().mockRejectedValueOnce(new Error('Invalid token'))
      });

      const idToken = 'invalid-token';
      
      // The function should throw an error
      await expect(googleSignIn(idToken)).rejects.toThrow();
    });
  });
}); 