import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import BuyerView from "./BuyerView";
import SellerView from "./SellerView";

interface ActivityPanelProps {
  viewMode: "buyer" | "seller";
}

const ActivityPanel: React.FC<ActivityPanelProps> = ({ viewMode }) => {
  const [transactionType, setTransactionType] = useState<
    "pending" | "inProgress"
  >("pending");

  // Function to format date and time
  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Function to format time duration
  const formatDuration = (startTime: string, endTime: string) => {
    const end = new Date(endTime);

    return `${formatDateTime(startTime)} - ${end.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  return (
    <Grid size={12} sx={{ mt: 3 }}>
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {viewMode === "buyer" ? "Your Transaction" : "Your Availabilities"}
          </Typography>
        </Box>

        {/* Buyer view with transaction type toggle */}
        {viewMode === "buyer" && (
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <Button
              variant={transactionType === "pending" ? "contained" : "outlined"}
              color="primary"
              onClick={() => setTransactionType("pending")}
              sx={{
                borderRadius: 2,
                ...(transactionType === "pending"
                  ? { bgcolor: "#ff9800", "&:hover": { bgcolor: "#f57c00" } }
                  : {
                      color: "#ff9800",
                      borderColor: "#ff9800",
                      "&:hover": { borderColor: "#f57c00", color: "#f57c00" },
                    }),
              }}
            >
              Pending
            </Button>
            <Button
              variant={
                transactionType === "inProgress" ? "contained" : "outlined"
              }
              color="primary"
              onClick={() => setTransactionType("inProgress")}
              sx={{
                borderRadius: 2,
                ...(transactionType === "inProgress"
                  ? { bgcolor: "#2196f3", "&:hover": { bgcolor: "#1976d2" } }
                  : {
                      color: "#2196f3",
                      borderColor: "#2196f3",
                      "&:hover": { borderColor: "#1976d2", color: "#1976d2" },
                    }),
              }}
            >
              In Progress
            </Button>
          </Box>
        )}

        {/* Scrollable content container */}
        <Box
          sx={{
            height: 300,
            overflow: "auto",
            pr: 1,
            // Add custom scrollbar styling
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "#f1f1f1",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#c1c1c1",
              borderRadius: "10px",
              "&:hover": {
                backgroundColor: "#a8a8a8",
              },
            },
          }}
        >
          {viewMode === "buyer" ? (
            <BuyerView
              transactionType={transactionType}
              formatDuration={formatDuration}
            />
          ) : (
            <SellerView formatDuration={formatDuration} />
          )}
        </Box>

        {/* Add New Availability button - only shown in seller view */}
        {viewMode === "seller" && (
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2, px: 3 }}
            >
              Add New Availability
            </Button>
          </Box>
        )}
      </Paper>
    </Grid>
  );
};

export default ActivityPanel;
