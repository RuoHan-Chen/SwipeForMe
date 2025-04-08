import { DiningLocation } from "../types";
import { TransactionStatus } from "../clients/transactionClient";

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
 * Converts a string representation of a TransactionStatus to the enum value
 * @param statusString The string value to convert
 * @returns The corresponding TransactionStatus enum value
 */
export const convertToTransactionStatus = (
  statusString: string
): TransactionStatus => {
  return TransactionStatus[statusString as keyof typeof TransactionStatus];
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
 * Generic function to convert a transaction object's status property
 * from string to TransactionStatus enum
 * @param transaction The transaction object with string status
 * @returns A new transaction object with proper TransactionStatus enum value
 */
export const convertTransactionStatus = <T extends { status: any }>(
  transaction: T
): T => {
  return {
    ...transaction,
    status: convertToTransactionStatus(transaction.status),
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
 * Utility function to map an array of objects with status properties
 * @param items Array of items with status properties
 * @returns New array with converted TransactionStatus enum values
 */
export const mapStatusToEnum = <T>(items: T[]): T[] => {
  return items.map((item: any) => {
    if (item.status) {
      return convertTransactionStatus(item);
    }
    return item;
  });
};

/**
 * Utility function to map an array of objects with location and status properties
 * Handles both transaction and availability objects
 * @param items Array of items with location and status properties
 * @returns New array with converted enum values
 */
export const mapLocationsToEnum = <T>(items: T[]): T[] => {
  return items.map((item: any) => {
    let convertedItem = item;

    // If it's a transaction-like object with availability.location
    if (item.availability && item.availability.location) {
      convertedItem = convertTransactionLocations(convertedItem);
    }
    // If it's an availability-like object with direct location property
    else if (item.location) {
      convertedItem = convertAvailabilityLocation(convertedItem);
    }

    // // Convert status if present
    // if (item.status) {
    //   convertedItem = convertTransactionStatus(convertedItem);
    // }

    return convertedItem;
  });
};
