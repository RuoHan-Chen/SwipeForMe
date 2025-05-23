import { Box, Paper, Typography, Button } from "@mui/material";
import { Availability } from "../../../../types";
import EventIcon from "@mui/icons-material/Event";

interface AvailabilityCardProps {
  availability: Availability;
  formatDuration: (startTime: string, endTime: string) => string;
  onEdit?: (id: number) => void;
  handleAddToCalendar: (availability: Availability) => void;
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({
  availability,
  formatDuration,
  onEdit,
  handleAddToCalendar,
}) => {
  return (
    <Paper
      key={availability.id}
      elevation={1}
      sx={{
        p: 2,
        mb: 2,
        borderLeft: "4px solid #4caf50",
        "&:hover": { boxShadow: 3, cursor: "pointer" },
      }}
      onClick={() => onEdit && onEdit(availability.id)}
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
            {formatDuration(availability.startTime, availability.endTime)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {availability.location}
          </Typography>
        </Box>
        <Button
          startIcon={<EventIcon />}
          variant="outlined"
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCalendar(availability);
          }}
        >
          <strong>+</strong>
        </Button>
      </Box>
    </Paper>
  );
};

export default AvailabilityCard;
