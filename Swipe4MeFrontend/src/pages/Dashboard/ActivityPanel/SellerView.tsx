import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { Availability, Transaction } from "../../../types";
import {
  acceptTransaction,
  rejectTransaction,
} from "../../../clients/transactionClient";
import { useSnackbar } from "../../../context/SnackbarContext";

interface PendingInviteCardProps {
  transaction: Transaction;
  formatDuration: (startTime: string, endTime: string) => string;
}

const PendingInviteCard = ({
  transaction,
  formatDuration,
}: PendingInviteCardProps) => {
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);
  const { success, error } = useSnackbar();

  const handleAccept = async (transactionId: number) => {
    try {
      setLoadingAccept(true);
      await acceptTransaction(transactionId);
      success("Transaction accepted");
    } catch (e) {
      error((e as Error).message);
    } finally {
      setLoadingAccept(false);
    }
  };

  const handleDecline = async (transactionId: number) => {
    try {
      setLoadingDecline(true);
      await rejectTransaction(transactionId);
      success("Transaction rejected");
    } catch (e) {
      error((e as Error).message);
    } finally {
      setLoadingDecline(false);
    }
  };

  return (
    <Paper
      key={transaction.id}
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderLeft: "4px solid #ff9800",
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
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={transaction.buyer.profilePicUrl}
            alt={transaction.buyer.firstName + " " + transaction.buyer.lastName}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              {formatDuration(
                transaction.availability.startTime,
                transaction.availability.endTime
              )}{" "}
              @ {transaction.availability.location}
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: "medium" }}>
              {transaction.buyer.firstName + " " + transaction.buyer.lastName}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            size="small"
            variant="outlined"
            color="error"
            sx={{ borderRadius: 2 }}
            loading={loadingDecline}
            onClick={() => handleDecline(transaction.id)}
          >
            Decline
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
            loading={loadingAccept}
            onClick={() => handleAccept(transaction.id)}
          >
            Accept
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

interface SellerViewProps {
  availabilities: Availability[];
  sellerTransactions: Transaction[];
  formatDuration: (startTime: string, endTime: string) => string;
}

const SellerView: React.FC<SellerViewProps> = ({
  availabilities,
  sellerTransactions,
  formatDuration,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {/* Left panel - Upcoming Availabilities */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
          Upcoming Availabilities
        </Typography>

        <Box sx={{ maxHeight: 250, overflow: "auto", pr: 1 }}>
          {availabilities.length > 0 ? (
            availabilities.map((availability, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{
                  p: 2,
                  mb: 2,
                  borderLeft: "4px solid #4caf50",
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
                        availability.startTime,
                        availability.endTime
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Location: {availability.location}
                    </Typography>
                  </Box>
                </Box>
              </Paper>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No upcoming availabilities
            </Typography>
          )}
        </Box>
      </Box>

      {/* Right panel - Pending Invites */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
          Pending Invites
        </Typography>

        <Box sx={{ maxHeight: 250, overflow: "auto", pr: 1 }}>
          {sellerTransactions.filter(
            (transaction) => transaction.status === "PENDING"
          ).length > 0 ? (
            sellerTransactions
              .filter((transaction) => transaction.status === "PENDING")
              .map((transaction) => (
                <PendingInviteCard
                  transaction={transaction}
                  formatDuration={formatDuration}
                />
              ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No pending invites
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SellerView;
