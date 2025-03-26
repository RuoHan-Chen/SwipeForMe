import { Box, Paper, Typography, IconButton, Tooltip } from "@mui/material";
import { Availability } from "../../../../types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface AvailabilityCardProps {
  availability: Availability;
  formatDuration: (startTime: string, endTime: string) => string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const AvailabilityCard: React.FC<AvailabilityCardProps> = ({
  availability,
  formatDuration,
  onEdit,
  onDelete,
}) => {
  return (
    <Paper
      key={availability.id}
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
            {formatDuration(availability.startTime, availability.endTime)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Location: {availability.location}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Edit Availability">
            <IconButton
              size="small"
              color="primary"
              onClick={() => onEdit && onEdit(availability.id)}
              sx={{
                mr: 1,
                "&:hover": {
                  bgcolor: "rgba(138, 43, 226, 0.08)",
                },
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Delete Availability">
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete && onDelete(availability.id)}
              sx={{
                "&:hover": {
                  bgcolor: "rgba(211, 47, 47, 0.08)",
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
};

export default AvailabilityCard;
