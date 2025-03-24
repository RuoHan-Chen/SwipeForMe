// Author: Steven Yi
// Time spent: 15 minutes

import { toEndpointUrl } from "./utils";

export interface AvailabilityResponse {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  location: string;
  startTime: string;
  endTime: string;
  email: string;
  rating?: number;
}

export type GetAllAvailabilityResponse = AvailabilityResponse[];

export interface CreateAvailabilityRequest {
  userId: number;
  location: string;
  startTime: string;
  endTime: string;
}

export const getAllAvailabilities =
  async (): Promise<GetAllAvailabilityResponse> => {
    const response = await fetch(toEndpointUrl("/api/availabilities"), {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  };

export const createAvailability = async (
  request: CreateAvailabilityRequest
): Promise<AvailabilityResponse> => {
  const urlWithParams =
    "/api/availabilities?" +
    new URLSearchParams({
      userId: request.userId.toString(),
      location: request.location,
      startTime: request.startTime,
      endTime: request.endTime,
    }).toString();
  const response = await fetch(toEndpointUrl(urlWithParams), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create availability");
  }

  return await response.json();
};
