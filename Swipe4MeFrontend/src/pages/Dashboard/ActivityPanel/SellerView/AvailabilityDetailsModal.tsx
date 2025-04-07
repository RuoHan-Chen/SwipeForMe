import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Availability, DiningLocation } from "../../../../types";
import { useSnackbar } from "../../../../context/SnackbarContext";
import { updateAvailability } from "../../../../clients/availabilityClient";

interface AvailabilityDetailsModalProps {
  open: boolean;
  onClose: () => void;
  availability: Availability;
  onAvailabilityUpdated: () => void;
}

const AvailabilityDetailsModal: React.FC<AvailabilityDetailsModalProps> = ({
  open,
  onClose,
  availability,
  onAvailabilityUpdated,
}) => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState<DiningLocation>(
    availability.location
  );
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const { snackbar } = useSnackbar();

  // Initialize form values when availability changes
  React.useEffect(() => {
    if (availability) {
      setDate(dayjs(availability.startTime));
      setLocation(availability.location);
      setStartTime(dayjs(availability.startTime));
      setEndTime(dayjs(availability.endTime));
    }
  }, [availability]);

  const handleSave = async () => {
    try {
      if (!date || !startTime || !endTime) {
        snackbar.error("Please fill in all fields");
        return;
      }

      // Combine date and time
      const startDateTime = date
        .hour(startTime.hour())
        .minute(startTime.minute());
      const endDateTime = date.hour(endTime.hour()).minute(endTime.minute());

      // Format in ISO format
      const startTimeISO = startDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      const endTimeISO = endDateTime.format("YYYY-MM-DDTHH:mm:ss.SSSZ");

      await updateAvailability(availability.id, {
        location: location.toUpperCase(),
        startTime: startTimeISO,
        endTime: endTimeISO,
      });

      snackbar.success("Availability updated successfully");
      onAvailabilityUpdated();
      onClose();
    } catch (error) {
      snackbar.error("Failed to update availability");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: "background.paper",
        },
      }}
    >
      <DialogTitle>Edit Availability</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            {/* Left side - Edit form */}
            <Grid item xs={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <DatePicker
                      label="Date"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Location</InputLabel>
                      <Select
                        value={location}
                        label="Location"
                        onChange={(e) =>
                          setLocation(e.target.value as DiningLocation)
                        }
                      >
                        {Object.values(DiningLocation).map((loc) => (
                          <MenuItem key={loc} value={loc}>
                            {loc}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </Grid>

            {/* Right side - Reserved for showing registered users */}
            <Grid item xs={4}>
              <Box sx={{ p: 2, bgcolor: "grey.100", borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Registered Users
                </Typography>
                {/* TODO: Add list of registered users here */}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvailabilityDetailsModal;
