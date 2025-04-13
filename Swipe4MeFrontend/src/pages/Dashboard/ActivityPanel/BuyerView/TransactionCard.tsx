import React, { useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  IconButton,
  Tooltip,
  Popover,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EventIcon from "@mui/icons-material/Event";
import { Transaction, Availability } from "../../../../types";

interface TransactionCardProps {
  transaction: Transaction;
  status: "buyer" | "seller";
  pending: boolean;
  formatDuration: (startTime: string, endTime: string) => string;
  onDecline?: (transactionId: number) => void;
  onAccept?: (transactionId: number) => void;
  onCancel?: (transactionId: number) => void;
  handleAddToCalendar: (availability: Availability) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  transaction,
  status,
  pending,
  formatDuration,
  onDecline,
  onAccept,
  onCancel,
  handleAddToCalendar,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  // Determine which user to display based on status
  const displayUser =
    status === "buyer" ? transaction.seller : transaction.buyer;

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          p: 1.5,
          mb: 2,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.08)",
          "&:hover": { boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.12)" },
          width: "90%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Left side - User info and transaction details */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {/* User Avatar */}
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Avatar
                src={displayUser.profilePicUrl}
                alt={`${displayUser.firstName} ${displayUser.lastName}`}
                sx={{ width: 60, height: 60 }}
              />
            </IconButton>

            {/* Transaction Details */}
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 0.5 }}
              >
                {formatDuration(
                  transaction.availability.startTime,
                  transaction.availability.endTime
                )}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                @ <strong>{transaction.availability.location}</strong>
              </Typography>
            </Box>
          </Box>

          {/* Right side - Action buttons */}
          <Box sx={{ display: "flex", gap: 1 }}>
            {status === "buyer" ? (
              <>
                {!pending && (
                  <Tooltip title="Add to calendar" arrow>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCalendar(transaction.availability);
                      }}
                      color="primary"
                    >
                      <EventIcon />
                    </IconButton>
                  </Tooltip>
                )}
                <Tooltip title="Cancel swipe session" arrow>
                  <IconButton
                    onClick={() => onCancel && onCancel(transaction.id)}
                    sx={{
                      color: "#e91e63",
                      "&:hover": {
                        color: "#c2185b",
                        backgroundColor: "rgba(233, 30, 99, 0.04)",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
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

      {/* User Details Popover */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPopover-paper": {
            borderRadius: 2,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            padding: 2,
            minWidth: 200,
          },
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
            {displayUser.firstName} {displayUser.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {displayUser.email}
          </Typography>
        </Box>
      </Popover>
    </>
  );
};

export default TransactionCard;
