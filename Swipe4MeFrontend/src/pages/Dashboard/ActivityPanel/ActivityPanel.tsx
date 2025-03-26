import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BuyerView from "./BuyerView";
import SellerView from "./SellerView";

interface ActivityPanelProps {
  viewMode: "buyer" | "seller";
}

const ActivityPanel: React.FC<ActivityPanelProps> = ({ viewMode }) => {
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
            mb: 1,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            {viewMode === "buyer" ? "Your Transactions" : "Your Availabilities"}
          </Typography>
        </Box>

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
            <BuyerView viewMode={viewMode} formatDuration={formatDuration} />
          ) : (
            <SellerView formatDuration={formatDuration} />
          )}
        </Box>
      </Paper>
    </Grid>
  );
};

export default ActivityPanel;
