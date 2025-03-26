import React from "react";
import { Paper, Typography, Box, Avatar, Button } from "@mui/material";
import { Transaction } from "../../../../types";

interface TransactionCardProps {
  transaction: Transaction;
  status: "buyer" | "seller";
  formatDuration: (startTime: string, endTime: string) => string;
  onDecline?: (transactionId: number) => void;
  onAccept?: (transactionId: number) => void;
  onCancel?: (transactionId: number) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  status,
  formatDuration,
  onDecline,
  onAccept,
  onCancel,
}) => {
  // Determine which user to display based on status
  const displayUser =
    status === "buyer" ? transaction.seller : transaction.buyer;

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        mb: 2,
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.08)",
        "&:hover": { boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.12)" },
        width: "100%",
      }}
    >
      {/* Content container to keep everything aligned */}
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {/* Top row with avatar and transaction details */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* User Avatar */}
          <Avatar
            src={displayUser.profilePicUrl}
            alt={`${displayUser.firstName} ${displayUser.lastName}`}
            sx={{ width: 70, height: 70, mr: 3 }}
          />

          {/* Transaction Details */}
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 0.5 }}>
              {displayUser.firstName} {displayUser.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
              {formatDuration(
                transaction.availability.startTime,
                transaction.availability.endTime
              )}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @ <strong>{transaction.availability.location}</strong>
            </Typography>
          </Box>
        </Box>

        {/* Bottom row with action buttons - aligned with the content above */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "center",
            width: "100%",
          }}
        >
          {status === "buyer" ? (
            <>
              <Button
                variant="contained"
                onClick={() => onCancel && onCancel(transaction.id)}
                sx={{
                  bgcolor: "#e91e63",
                  color: "white",
                  "&:hover": { bgcolor: "#c2185b" },
                  borderRadius: 8,
                  px: 3,
                  py: 1,
                  minWidth: "100px",
                }}
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => onDecline && onDecline(transaction.id)}
                sx={{
                  bgcolor: "#e91e63",
                  color: "white",
                  "&:hover": { bgcolor: "#c2185b" },
                  borderRadius: 8,
                  px: 3,
                  py: 1,
                  minWidth: "100px",
                }}
              >
                Decline
              </Button>
              <Button
                variant="contained"
                onClick={() => onAccept && onAccept(transaction.id)}
                sx={{
                  bgcolor: "#4caf50",
                  color: "white",
                  "&:hover": { bgcolor: "#388e3c" },
                  borderRadius: 8,
                  px: 3,
                  py: 1,
                  minWidth: "100px",
                }}
              >
                Accept
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default TransactionCard;
