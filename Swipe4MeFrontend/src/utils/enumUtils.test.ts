import { DiningLocation } from "../types";
import {
  convertToDiningLocation,
  convertTransactionLocations,
  convertAvailabilityLocation,
  mapLocationsToEnum,
} from "./enumUtils";

describe("Enum Utilities", () => {
  describe("convertToDiningLocation", () => {
    it("converts string to enum value", () => {
      expect(convertToDiningLocation("COMMONS")).toBe(DiningLocation.COMMONS);
      expect(convertToDiningLocation("RAND")).toBe(DiningLocation.RAND);
    });
  });

  describe("convertTransactionLocations", () => {
    it("converts transaction location strings to enum values", () => {
      const transaction = {
        id: 1,
        availability: {
          id: 2,
          location: "COMMONS",
          startTime: "2023-01-01T12:00:00Z",
          endTime: "2023-01-01T13:00:00Z",
          user: { id: 3 },
        },
        buyer: { id: 4 },
        seller: { id: 5 },
        status: "PENDING",
      };

      const converted = convertTransactionLocations(transaction);
      expect(converted.availability.location).toBe(DiningLocation.COMMONS);
    });
  });

  describe("convertAvailabilityLocation", () => {
    it("converts availability location strings to enum values", () => {
      const availability = {
        id: 1,
        location: "RAND",
        startTime: "2023-01-01T12:00:00Z",
        endTime: "2023-01-01T13:00:00Z",
        user: { id: 2 },
      };

      const converted = convertAvailabilityLocation(availability);
      expect(converted.location).toBe(DiningLocation.RAND);
    });
  });

  describe("mapLocationsToEnum", () => {
    it("handles an array of transactions", () => {
      const transactions = [
        {
          id: 1,
          availability: {
            id: 2,
            location: "COMMONS",
            startTime: "2023-01-01T12:00:00Z",
            endTime: "2023-01-01T13:00:00Z",
            user: { id: 3 },
          },
          buyer: { id: 4 },
          seller: { id: 5 },
          status: "PENDING",
        },
        {
          id: 6,
          availability: {
            id: 7,
            location: "RAND",
            startTime: "2023-01-01T14:00:00Z",
            endTime: "2023-01-01T15:00:00Z",
            user: { id: 8 },
          },
          buyer: { id: 9 },
          seller: { id: 10 },
          status: "PENDING",
        },
      ];

      const converted = mapLocationsToEnum(transactions);
      expect(converted[0].availability.location).toBe(DiningLocation.COMMONS);
      expect(converted[1].availability.location).toBe(DiningLocation.RAND);
    });

    it("handles an array of availabilities", () => {
      const availabilities = [
        {
          id: 1,
          location: "COMMONS",
          startTime: "2023-01-01T12:00:00Z",
          endTime: "2023-01-01T13:00:00Z",
          user: { id: 2 },
        },
        {
          id: 3,
          location: "RAND",
          startTime: "2023-01-01T14:00:00Z",
          endTime: "2023-01-01T15:00:00Z",
          user: { id: 4 },
        },
      ];

      const converted = mapLocationsToEnum(availabilities);
      expect(converted[0].location).toBe(DiningLocation.COMMONS);
      expect(converted[1].location).toBe(DiningLocation.RAND);
    });
  });
});
