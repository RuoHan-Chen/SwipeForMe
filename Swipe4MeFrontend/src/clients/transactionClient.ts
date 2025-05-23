// Author: Steven Yi
// Time spent: 30 minutes

import { Rating, Transaction } from "../types";
import { toEndpointUrl } from "./utils";

export interface CreateTransactionRequest {
  availabilityId: number;
  buyerId: number;
  sellerId: number;
}

export enum TransactionStatus {
  PENDING = "Pending",
  IN_PROGRESS = "In Progress",
  COMPLETED = "Completed",
  AWAITING_REVIEW = "Awaiting Review",
  REJECTED = "Rejected",
}

export const getTransactionById = async (transactionId: number): Promise<Transaction> => {
  const response = await fetch(toEndpointUrl(`/api/transactions/${transactionId}`), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get transaction");
  }

  const transaction = await response.json();
  console.log(transaction);
  return transaction;
};

export const getRatingByTransactionId = async (transactionId: number): Promise<Rating> => {
  const response = await fetch(toEndpointUrl(`/api/transactions/${transactionId}/rating`), {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to get rating");
  }

  const rating = await response.json();
  console.log(rating);
  return rating;
}

export const createTransaction = async (request: CreateTransactionRequest) => {
  const urlWithParams =
    "/api/transactions?" +
    new URLSearchParams({
      availabilityId: request.availabilityId.toString(),
      buyerId: request.buyerId.toString(),
      sellerId: request.sellerId.toString(),
      status: "PENDING",
    }).toString();

  const response = await fetch(toEndpointUrl(urlWithParams), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  return await response.json();
};

export const completeTransaction = async (transactionId: number) => {
  const urlWithParams =
    `/api/transactions/${transactionId}/status?` +
    new URLSearchParams({
      status: "COMPLETED",
    }).toString();

    const response = await fetch(toEndpointUrl(urlWithParams), {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to complete transaction");
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

export const acceptTransaction = async (transactionId: number) => {
  const urlWithParams =
    `/api/transactions/${transactionId}/status?` +
    new URLSearchParams({
      status: "IN_PROGRESS",
    }).toString();

  const response = await fetch(toEndpointUrl(urlWithParams), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to accept transaction");
  }

  return await response.json();
};

export const awaitReviewTransaction = async (transactionId: number) => {
  const urlWithParams =
    `/api/transactions/${transactionId}/status?` +
    new URLSearchParams({
      status: "AWAITING_REVIEW",
    }).toString();

  const response = await fetch(toEndpointUrl(urlWithParams), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to await review transaction");
  }

  return await response.json();
};

export const cancelTransaction = async (transactionId: number) => {
  const urlWithParams =
    `/api/transactions/${transactionId}/status?` +
    new URLSearchParams({
      status: "REJECTED",
    }).toString();

  const response = await fetch(toEndpointUrl(urlWithParams), {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to cancel transaction");
  }

  return await response.json();
};
