export interface Transaction {
  id?: number;
  availabilityId: number;
  buyer_id: number;
  seller_id: number;
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
      ContentType: "application/json",
    },
    body: JSON.stringify(transaction),
  });

  if (!response.ok) {
    throw new Error("Failed to create transaction");
  }

  return await response.json();
};
