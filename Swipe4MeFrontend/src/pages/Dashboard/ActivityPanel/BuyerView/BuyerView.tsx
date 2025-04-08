import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { Transaction } from "../../../../types";
import {
  cancelTransaction,
  getCurrentUserTransactionsAsBuyer,
  TransactionStatus,
} from "../../../../clients/transactionClient";
import { StyledTab, StyledTabs } from "../styledComponents";
import TransactionCard from "./TransactionCard";
import Box from "@mui/material/Box";
import {
  mapLocationsToEnum,
  mapStatusToEnum,
} from "../../../../utils/enumUtils";
import Paper from "@mui/material/Paper";
import { useSnackbar } from "../../../../context/SnackbarContext";

interface BuyerViewProps {
  viewMode: "buyer" | "seller";
  formatDuration: (startTime: string, endTime: string) => string;
}

const BuyerView: React.FC<BuyerViewProps> = ({ viewMode, formatDuration }) => {
  const [buyerTransactions, setBuyerTransactions] = useState<Transaction[]>([]);
  const [transactionType, setTransactionType] = useState<
    "pending" | "inProgress"
  >("pending");
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

  // Handle tab change
  const handleTabChange = (
    _: React.SyntheticEvent,
    newValue: "pending" | "inProgress"
  ) => {
    setTransactionType(newValue);
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

  // Filter transactions based on selected type
  const filteredTransactions = buyerTransactions.filter(
    (transaction) =>
      transaction.status ===
      (transactionType === "pending"
        ? TransactionStatus.PENDING
        : TransactionStatus.IN_PROGRESS)
  );

  console.log(buyerTransactions);

  return (
    <>
      {/* Transaction type toggle */}
      {viewMode === "buyer" && (
        <Box sx={{ position: "sticky", top: 0, zIndex: 1000 }}>
          <Paper elevation={0}>
            <StyledTabs
              value={transactionType}
              onChange={handleTabChange}
              aria-label="transaction tabs"
              variant="fullWidth"
              TabIndicatorProps={{
                sx: { transition: "all 0.2s ease" },
              }}
            >
              <StyledTab
                value="pending"
                label="Pending Confirmation"
                disableRipple
              />
              <StyledTab value="inProgress" label="Confirmed" disableRipple />
            </StyledTabs>
          </Paper>
        </Box>
      )}

      {filteredTransactions.length > 0 ? (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Grid
            container
            columnSpacing={10}
            sx={{
              maxWidth: "fit-content",
              margin: "0 auto",
            }}
          >
            {filteredTransactions.map((transaction, index) => (
              <Grid size="auto" key={index}>
                <TransactionCard
                  transaction={transaction}
                  status="buyer"
                  formatDuration={formatDuration}
                  onCancel={handleCancel}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Typography variant="body1" color="text.secondary">
          No{" "}
          {transactionType === "pending" ? "pending confirmation" : "confirmed"}{" "}
          transactions
        </Typography>
      )}
    </>
  );
};

export default BuyerView;
