import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { Transaction } from "../../../types";
import { getCurrentUserTransactionsAsBuyer } from "../../../clients/transactionClient";
import { StyledTab } from "./styledComponents";
import { StyledTabs } from "./styledComponents";

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
      setBuyerTransactions(response);
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

  if (loading) {
    return <Typography>Loading transactions...</Typography>;
  }

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

      {buyerTransactions.length > 0 ? (
        buyerTransactions
          .filter(
            (transaction) =>
              transaction.status ===
              (transactionType === "pending" ? "PENDING" : "IN_PROGRESS")
          )
          .map((transaction, index) => (
            <Paper
              key={index}
              elevation={1}
              sx={{
                p: 2,
                mb: 2,
                borderLeft: `4px solid ${
                  transactionType === "pending" ? "#ff9800" : "#2196f3"
                }`,
                "&:hover": { boxShadow: 3 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {formatDuration(
                      transaction.availability.startTime,
                      transaction.availability.endTime
                    )}{" "}
                    @ {transaction.availability.location}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    src={transaction.seller.profilePicUrl}
                    alt={
                      transaction.seller.firstName +
                      " " +
                      transaction.seller.lastName
                    }
                    sx={{ width: 40, height: 40 }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                    {transaction.seller.firstName +
                      " " +
                      transaction.seller.lastName}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))
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
