import { DiningLocation } from "../types";

/**
 * Converts a string representation of a DiningLocation to the enum value
 * @param locationString The string value to convert
 * @returns The corresponding DiningLocation enum value
 */
export const convertToDiningLocation = (
  locationString: string
): DiningLocation => {
  return DiningLocation[locationString as keyof typeof DiningLocation];
};

/**
 * Generic function to convert a transaction object's location properties
 * from string to DiningLocation enum
 * @param transaction The transaction object with string locations
 * @returns A new transaction object with proper DiningLocation enum values
 */
export const convertTransactionLocations = <
  T extends { availability: { location: any } }
>(
  transaction: T
): T => {
  return {
    ...transaction,
    availability: {
      ...transaction.availability,
      location: convertToDiningLocation(transaction.availability.location),
    },
  };
};

/**
 * Generic function to convert an availability object's location property
 * from string to DiningLocation enum
 * @param availability The availability object with string location
 * @returns A new availability object with proper DiningLocation enum value
 */
export const convertAvailabilityLocation = <T extends { location: any }>(
  availability: T
): T => {
  return {
    ...availability,
    location: convertToDiningLocation(availability.location),
  };
};

/**
 * Utility function to map an array of objects with location properties
 * Handles both transaction and availability objects
 * @param items Array of items with location properties
 * @returns New array with converted enum values
 */
export const mapLocationsToEnum = <T>(items: T[]): T[] => {
  return items.map((item: any) => {
    // If it's a transaction-like object with availability.location
    if (item.availability && item.availability.location) {
      return convertTransactionLocations(item);
    }
    // If it's an availability-like object with direct location property
    else if (item.location) {
      return convertAvailabilityLocation(item);
    }
    // Return unchanged if no location property found
    return item;
  });
};
