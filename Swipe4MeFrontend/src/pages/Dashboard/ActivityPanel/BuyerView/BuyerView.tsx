import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { Transaction, Availability } from "../../../../types";
import {
  cancelTransaction,
  getCurrentUserTransactionsAsBuyer,
  TransactionStatus,
} from "../../../../clients/transactionClient";
import TransactionCard from "./TransactionCard";
import Box from "@mui/material/Box";
import {
  mapLocationsToEnum,
  mapStatusToEnum,
} from "../../../../utils/enumUtils";
import { useSnackbar } from "../../../../context/SnackbarContext";

interface BuyerViewProps {
  formatDuration: (startTime: string, endTime: string) => string;
  handleAddToCalendar: (availability: Availability) => void;
}

const BuyerView: React.FC<BuyerViewProps> = ({
  formatDuration,
  handleAddToCalendar,
}) => {
  const [buyerTransactions, setBuyerTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const { snackbar } = useSnackbar();

  const fetchBuyerTransactions = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserTransactionsAsBuyer();

      // Convert location strings to enum values using our utility function
      const mappedTransactions = mapLocationsToEnum(response);
      const mappedStatusTransactions = mapStatusToEnum(mappedTransactions);

      setBuyerTransactions(mappedStatusTransactions);
    } catch (error) {
      snackbar.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyerTransactions();
  }, []);

  // Handle transaction actions
  const handleCancel = async (transactionId: number) => {
    try {
      snackbar.loading("Cancelling transaction...");
      await cancelTransaction(transactionId);
      snackbar.success("Transaction cancelled");
      fetchBuyerTransactions();
    } catch (error) {
      snackbar.error("Failed to cancel transaction");
    }
  };

  if (loading) {
    return <Typography>Loading transactions...</Typography>;
  }

  // Filter transactions based on status
  const pendingTransactions = buyerTransactions.filter(
    (transaction) => transaction.status === TransactionStatus.PENDING
  );
  const confirmedTransactions = buyerTransactions.filter(
    (transaction) => transaction.status === TransactionStatus.IN_PROGRESS
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "row", gap: 4, width: "100%" }}>
      {/* Pending Transactions Section */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Pending Confirmation
        </Typography>
        {pendingTransactions.length > 0 ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {pendingTransactions.map((transaction, index) => (
              <Box key={index} sx={{ width: "100%" }}>
                <TransactionCard
                  pending={true}
                  transaction={transaction}
                  status="buyer"
                  formatDuration={formatDuration}
                  onCancel={handleCancel}
                  handleAddToCalendar={handleAddToCalendar}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No pending confirmation transactions
          </Typography>
        )}
      </Box>

      {/* Confirmed Transactions Section */}
      <Box sx={{ flex: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Confirmed
        </Typography>
        {confirmedTransactions.length > 0 ? (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 1,
              width: "100%",
              maxWidth: "1000px",
            }}
          >
            {confirmedTransactions.map((transaction, index) => (
              <Box key={index} sx={{ width: "100%" }}>
                <TransactionCard
                  pending={false}
                  transaction={transaction}
                  status="buyer"
                  formatDuration={formatDuration}
                  onCancel={handleCancel}
                  handleAddToCalendar={handleAddToCalendar}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No confirmed transactions
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default BuyerView;
