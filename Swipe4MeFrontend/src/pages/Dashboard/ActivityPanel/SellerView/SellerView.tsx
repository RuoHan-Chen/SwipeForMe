import React, { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Grid from "@mui/material/Grid";
import { Availability, Transaction } from "../../../../types";
import {
  getCurrentUserTransactionsAsSeller,
  TransactionStatus,
} from "../../../../clients/transactionClient";
import { getCurrentUserAvailability } from "../../../../clients/availabilityClient";
import {
  mapLocationsToEnum,
  mapStatusToEnum,
} from "../../../../utils/enumUtils";
import PendingInviteCard from "./PendingInviteCard";
import AvailabilityCard from "./AvailabilityCard";
import AvailabilityDetailsModal from "./AvailabilityDetailsModal";
import { useNavigate } from "react-router-dom";

interface SellerViewProps {
  formatDuration: (startTime: string, endTime: string) => string;
}

const SellerView: React.FC<SellerViewProps> = ({ formatDuration }) => {
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [sellerTransactions, setSellerTransactions] = useState<Transaction[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability | null>(null);
  const navigate = useNavigate();

  const fetchAvailabilities = async () => {
    try {
      const response = await getCurrentUserAvailability();

      // Filter out availabilities that have already passed
      const currentTime = new Date();
      const upcomingAvailabilities = response.filter(
        (availability) => new Date(availability.endTime) > currentTime
      );

      // Convert location strings to enum values using our utility function
      const mappedAvailabilities = mapLocationsToEnum(upcomingAvailabilities);

      // Sort availabilities by start time
      const sortedAvailabilities = mappedAvailabilities.sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );

      setAvailabilities(sortedAvailabilities);
    } catch (error) {
      console.error("Error fetching availabilities:", error);
    }
  };

  const fetchSellerTransactions = async () => {
    try {
      setLoading(true);
      const response = await getCurrentUserTransactionsAsSeller();

      // Convert location strings to enum values using our utility function
      const mappedTransactions = mapLocationsToEnum(response);
      const mappedStatusTransactions = mapStatusToEnum(mappedTransactions);

      setSellerTransactions(mappedStatusTransactions);
    } catch (error) {
      console.error("Error fetching seller transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailabilities();
    fetchSellerTransactions();
  }, []);

  // Handler for editing an availability
  const handleEditAvailability = (id: number) => {
    const availability = availabilities.find((a) => a.id === id);
    if (availability) {
      setSelectedAvailability(availability);
    }
  };

  const handleAvailabilityUpdated = () => {
    fetchAvailabilities();
    setSelectedAvailability(null);
  };

  if (loading && sellerTransactions.length === 0) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box sx={{ display: "flex", gap: 3 }}>
      {/* Left panel - Upcoming Availabilities */}
      <Box sx={{ flex: 1, maxWidth: "33.33%" }}>
        <Typography variant="h6" sx={{ mb: 2, color: "text.secondary" }}>
          Upcoming Availabilities
        </Typography>

        <Box sx={{ maxHeight: 250, overflow: "auto", pr: 1 }}>
          {availabilities.length > 0 ? (
            availabilities.map((availability) => (
              <AvailabilityCard
                key={availability.id}
                availability={availability}
                formatDuration={formatDuration}
                onEdit={handleEditAvailability}
              />
            ))
          ) : (
            <Box>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                You don't have any upcoming availabilities. Add one now!
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  sx={{
                    borderRadius: 8,
                    px: 4,
                    py: 1,
                    textTransform: "none",
                    fontSize: "1rem",
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => {
                    navigate("/donateSwipes");
                  }}
                >
                  Add New Availability
                </Button>
              </Box>
            </Box>
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
            (transaction) => transaction.status === TransactionStatus.PENDING
          ).length > 0 ? (
            <Grid container spacing={2}>
              {sellerTransactions
                .filter(
                  (transaction) =>
                    transaction.status === TransactionStatus.PENDING
                )
                .map((transaction) => (
                  <Grid item key={transaction.id} xs={12} sm={6}>
                    <PendingInviteCard
                      transaction={transaction}
                      onTransactionUpdated={fetchSellerTransactions}
                    />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Typography variant="body1" color="text.secondary">
              No pending invites
            </Typography>
          )}
        </Box>
      </Box>

      {/* Availability Details Modal */}
      {selectedAvailability && (
        <AvailabilityDetailsModal
          open={!!selectedAvailability}
          onClose={() => setSelectedAvailability(null)}
          availability={selectedAvailability}
          onAvailabilityUpdated={handleAvailabilityUpdated}
        />
      )}
    </Box>
  );
};

export default SellerView;
