import { Box, Paper, Typography } from "@mui/material";
import { Availability } from "../../../../types";

interface AvailabilityCardProps {
  availability: Availability;
  formatDuration: (startTime: string, endTime: string) => string;
  onEdit?: (id: number) => void;
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({
  availability,
  formatDuration,
  onEdit,
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
      <Box>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {formatDuration(availability.startTime, availability.endTime)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Location: {availability.location}
        </Typography>
      </Box>
    </Paper>
  );
};

export default AvailabilityCard;
