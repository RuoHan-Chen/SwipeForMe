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

export const getAllAvailabilities =
  async (): Promise<GetAllAvailabilityResponse> => {
    const response = await fetch("/api/active", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        ContentType: "application/json",
      },
    });
    return await response.json();
  };
