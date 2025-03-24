import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import {
  AvailabilityResponse,
  getAvailabilityByUserId,
  getCurrentUserAvailability,
} from "../../clients/availabilityClient";
import {
  getCurrentUserTransactionsAsBuyer,
  getCurrentUserTransactionsAsSeller,
  Transaction,
} from "../../clients/transactionClient";

const ActivityPanel = () => {
  const [viewMode, setViewMode] = useState<"buyer" | "seller">("buyer");
  const [transactionType, setTransactionType] = useState<
    "pending" | "inProgress"
  >("pending");

  const [availabilities, setAvailabilities] = useState<AvailabilityResponse[]>(
    []
  );
  const [buyerTransactions, setBuyerTransactions] = useState<Transaction[]>([]);
  const [sellerTransactions, setSellerTransactions] = useState<Transaction[]>(
    []
  );

  // Fetch transactions for the current user
  useEffect(() => {
    const fetchBuyerTransactions = async () => {
      try {
        const response = await getCurrentUserTransactionsAsBuyer();
        setBuyerTransactions(response);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    const fetchSellerTransactions = async () => {
      try {
        const response = await getCurrentUserTransactionsAsSeller();
        setSellerTransactions(response);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchBuyerTransactions();
    fetchSellerTransactions();
  }, []);

  // Fetch availabilities for the current user
  useEffect(() => {
    const fetchAvailabilities = async () => {
      try {
        const response = await getCurrentUserAvailability();

        // Filter out availabilities that have already passed
        const currentTime = new Date();
        const upcomingAvailabilities = response.filter(
          (availability) => new Date(availability.startTime) > currentTime
        );

        setAvailabilities(upcomingAvailabilities);
      } catch (error) {
        console.error("Error fetching availabilities:", error);
      }
    };

    fetchAvailabilities();
  }, []);

  const placeholderData = {
    asBuyer: {
      pending: [
        {
          id: 1,
          title: "Book Purchase",
          status: "PENDING",
          availability: {
            location: "University Library",
            startTime: "2023-05-15T14:00:00Z",
            endTime: "2023-05-15T15:00:00Z",
          },
          amount: 25.99,
        },
        {
          id: 2,
          title: "Laptop Purchase",
          status: "PENDING",
          availability: {
            location: "Student Center",
            startTime: "2023-05-20T10:30:00Z",
            endTime: "2023-05-20T11:30:00Z",
          },
          amount: 899.0,
        },
      ],
      inProgress: [
        {
          id: 3,
          title: "Phone Repair Service",
          status: "IN_PROGRESS",
          availability: {
            location: "Tech Building",
            startTime: "2023-05-10T16:00:00Z",
            endTime: "2023-05-10T17:00:00Z",
          },
          amount: 150.0,
        },
      ],
    },
    availabilities: [
      {
        id: 1,
        location: "Campus Coffee Shop",
        startTime: "2023-05-18T09:15:00Z",
        endTime: "2023-05-18T10:00:00Z",
      },
      {
        id: 2,
        location: "Engineering Building",
        startTime: "2023-05-22T13:00:00Z",
        endTime: "2023-05-22T14:30:00Z",
      },
      {
        id: 3,
        location: "Math Department",
        startTime: "2023-05-25T11:00:00Z",
        endTime: "2023-05-25T12:00:00Z",
      },
      {
        id: 4,
        location: "Student Union",
        startTime: "2023-05-30T15:30:00Z",
        endTime: "2023-05-30T16:30:00Z",
      },
    ],
  };

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
    const start = new Date(startTime);
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
            {viewMode === "buyer" ? "Your Transactions" : "Your Availabilities"}
          </Typography>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant={viewMode === "buyer" ? "contained" : "outlined"}
              color="primary"
              onClick={() => setViewMode("buyer")}
              sx={{ borderRadius: 2 }}
            >
              As Buyer
            </Button>
            <Button
              variant={viewMode === "seller" ? "contained" : "outlined"}
              color="primary"
              onClick={() => setViewMode("seller")}
              sx={{ borderRadius: 2 }}
            >
              As Seller
            </Button>
          </Box>
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
            // Buyer View
            <>
              {transactionType === "pending" ? (
                // Pending Transactions
                <>
                  {buyerTransactions.length > 0 ? (
                    buyerTransactions.map((transaction, index) => (
                      <Paper
                        key={index}
                        elevation={1}
                        sx={{
                          p: 2,
                          mb: 2,
                          borderLeft: "4px solid #ff9800",
                          "&:hover": { boxShadow: 3 },
                        }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
                          {transaction.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {formatDateTime(transaction.availability.startTime)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Location: {transaction.availability.location}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          ${transaction.amount.toFixed(2)}
                        </Typography>
                      </Paper>
                    ))
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      No pending purchases
                    </Typography>
                  )}
                </>
              ) : (
                // In Progress Transactions
                <>
                  {placeholderData.asBuyer.inProgress.length > 0 ? (
                    placeholderData.asBuyer.inProgress.map(
                      (transaction, index) => (
                        <Paper
                          key={index}
                          elevation={1}
                          sx={{
                            p: 2,
                            mb: 2,
                            borderLeft: "4px solid #2196f3",
                            "&:hover": { boxShadow: 3 },
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "bold" }}
                          >
                            {transaction.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {formatDateTime(transaction.availability.startTime)}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Location: {transaction.availability.location}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            ${transaction.amount.toFixed(2)}
                          </Typography>
                        </Paper>
                      )
                    )
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      No in-progress purchases
                    </Typography>
                  )}
                </>
              )}
            </>
          ) : (
            // Seller View
            <>
              <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
                Upcoming Availabilities
              </Typography>

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
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: "bold" }}
                        >
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
            </>
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
