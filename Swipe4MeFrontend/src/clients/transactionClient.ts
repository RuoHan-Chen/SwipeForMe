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
  const response = await fetch("/api/transactions", {
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
