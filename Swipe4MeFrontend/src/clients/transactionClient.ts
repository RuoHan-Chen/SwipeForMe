// Author: Steven Yi
// Time spent: 30 minutes

import { toEndpointUrl } from "./utils";

export interface Transaction {
  id?: number;
  availabilityId: number;
  buyerId: number;
  sellerId: number;
  status: TransactionStatus;
}

export enum TransactionStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
  AWAITING_REVIEW = "AWAITING_REVIEW",
  REJECTED = "REJECTED",
}

export const createTransaction = async (transaction: Transaction) => {
  const response = await fetch(toEndpointUrl("/api/transactions"), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  return await response.json();
};

export const getCurrentUserTransactionsAsBuyer = async (): Promise<
  Transaction[]
> => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("User ID not found");
  }

  const response = await fetch(
    toEndpointUrl(`/api/transactions/buyer/${userId}`),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return await response.json();
};

export const getCurrentUserTransactionsAsSeller = async (): Promise<
  Transaction[]
> => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    throw new Error("User ID not found");
  }

  const response = await fetch(
    toEndpointUrl(`/api/transactions/seller/${userId}`),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return await response.json();
};
