import { useState } from "react";
import { Transaction } from "../../../../types";
import { useSnackbar } from "../../../../context/SnackbarContext";
import {
  acceptTransaction,
  cancelTransaction,
} from "../../../../clients/transactionClient";
import { Paper, Box, Avatar, Button, Typography } from "@mui/material";

interface PendingInviteCardProps {
  transaction: Transaction;
  formatDuration: (startTime: string, endTime: string) => string;
  onTransactionUpdated: () => void;
}

const PendingInviteCard = ({
  transaction,
  formatDuration,
  onTransactionUpdated,
}: PendingInviteCardProps) => {
  const [loadingAccept, setLoadingAccept] = useState(false);
  const [loadingDecline, setLoadingDecline] = useState(false);
  const { snackbar } = useSnackbar();

  const handleAccept = async (transactionId: number) => {
    try {
      setLoadingAccept(true);
      await acceptTransaction(transactionId);
      snackbar.success("Transaction accepted");
      onTransactionUpdated(); // Call the refetch function after successful acceptance
    } catch (e) {
      snackbar.error((e as Error).message);
    } finally {
      setLoadingAccept(false);
    }
  };

  const handleDecline = async (transactionId: number) => {
    try {
      setLoadingDecline(true);
      await cancelTransaction(transactionId);
      snackbar.success("Transaction rejected");
      onTransactionUpdated(); // Call the refetch function after successful rejection
    } catch (e) {
      snackbar.error((e as Error).message);
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
            disabled={loadingDecline || loadingAccept}
            onClick={() => handleDecline(transaction.id)}
          >
            Decline
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 2 }}
            disabled={loadingDecline || loadingAccept}
            onClick={() => handleAccept(transaction.id)}
          >
            Accept
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default PendingInviteCard;
