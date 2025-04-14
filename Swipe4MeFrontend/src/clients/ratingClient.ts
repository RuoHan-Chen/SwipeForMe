import { toEndpointUrl } from "./utils";

interface UpdateRatingRequest {
  toSellerRating?: number;
  toBuyerRating?: number;
}

export const updateRating = async (ratingId: number, request: UpdateRatingRequest) => {
  const response = await fetch(toEndpointUrl(`/api/ratings/${ratingId}`), {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    throw new Error('Failed to update rating');
  }

  return await response.json();
};