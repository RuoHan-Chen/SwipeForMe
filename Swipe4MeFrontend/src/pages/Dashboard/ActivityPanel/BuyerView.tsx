import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import { Transaction } from "../../../types";
import { getCurrentUserTransactionsAsBuyer } from "../../../clients/transactionClient";
import { StyledTab } from "./styledComponents";
import { StyledTabs } from "./styledComponents";
import TransactionCard from "./TransactionCard";
import Box from "@mui/material/Box";
import { DiningLocation } from "../../../types";

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

  const fetchBuyerTransactions = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserTransactionsAsBuyer();
      console.log(response);

      // Map the response to convert location string to enum
      const mappedTransactions = response.map((transaction) => ({
        ...transaction,
        availability: {
          ...transaction.availability,
          location:
            DiningLocation[
              transaction.availability.location as keyof typeof DiningLocation
            ],
        },
      }));

      setBuyerTransactions(mappedTransactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (
    event: React.SyntheticEvent,
    newValue: "pending" | "inProgress"
  ) => {
    setTransactionType(newValue);
  };

  useEffect(() => {
    fetchBuyerTransactions();
  }, []);

  // Handle transaction actions
  const handleCancel = (transactionId: number) => {
    console.log(`Cancel transaction ${transactionId}`);
    // Implement cancellation logic here
  };

  if (loading) {
    return <Typography>Loading transactions...</Typography>;
  }

  // Filter transactions based on selected type
  const filteredTransactions = buyerTransactions.filter(
    (transaction) =>
      transaction.status ===
      (transactionType === "pending" ? "PENDING" : "IN_PROGRESS")
  );

  return (
    <>
      {/* Transaction type toggle */}
      {viewMode === "buyer" && (
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
