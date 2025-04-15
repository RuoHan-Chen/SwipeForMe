import { toEndpointUrl } from "./utils";

export interface CreateRatingRequest {
  ratingId: number;
  toSellerRating: number;
  toBuyerRating: number;
}

export const updateRating = async (request: CreateRatingRequest) => {
  const response = await fetch(toEndpointUrl(`/api/ratings/${request.ratingId}`), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      toSellerRating: request.toSellerRating,
      toBuyerRating: request.toBuyerRating,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to create rating");
  }

  return await response.json();
};