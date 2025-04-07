// Author: Steven Yi
// Time spent: 15 minutes

import { toEndpointUrl } from "./utils";
import { Availability } from "../types";
export interface CreateAvailabilityRequest {
  userId: number;
  location: string;
  startTime: string;
  endTime: string;
}

export interface UpdateAvailabilityRequest {
  location: string;
  startTime: string;
  endTime: string;
}

export const getAllAvailabilities = async (): Promise<Availability[]> => {
  const response = await fetch(toEndpointUrl("/api/availabilities"), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  return await response.json();
};

export const getAvailabilityByUserId = async (
  userId: number
): Promise<Availability[]> => {
  const response = await fetch(
    toEndpointUrl(`/api/availabilities/user/${userId}`),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get availability by user ID");
  }

  return await response.json();
};

export const getCurrentUserAvailability = async (): Promise<Availability[]> => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("User ID not found");
  }

  const response = await fetch(
    toEndpointUrl(`/api/availabilities/user/${userId}`),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to get current user availability");
  }

  return await response.json();
};

export const createAvailability = async (
  request: CreateAvailabilityRequest
): Promise<Availability> => {
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

/**
 * Delete an availability by its ID
 * @param id The ID of the availability to delete
 * @returns A Promise that resolves when the deletion is complete
 */
export const deleteAvailability = async (id: number): Promise<void> => {
  const response = await fetch(toEndpointUrl(`/api/availabilities/${id}`), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to delete availability: ${response.status} ${response.statusText}`
    );
  }
};

export const updateAvailability = async (
  id: number,
  request: UpdateAvailabilityRequest
): Promise<Availability> => {
  const urlWithParams =
    `/api/availabilities/${id}?` +
    new URLSearchParams({
      location: request.location,
      startTime: request.startTime,
      endTime: request.endTime,
    }).toString();

  const response = await fetch(toEndpointUrl(urlWithParams), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to update availability");
  }

  return await response.json();
};
