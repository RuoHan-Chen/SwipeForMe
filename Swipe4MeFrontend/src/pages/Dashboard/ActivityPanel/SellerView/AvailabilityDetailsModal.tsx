import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { Availability, DiningLocation, User } from "../../../../types";
import { useSnackbar } from "../../../../context/SnackbarContext";
import {
  updateAvailability,
  getUsersByAvailabilityId,
} from "../../../../clients/availabilityClient";

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
  const [registeredUsers, setRegisteredUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const { snackbar } = useSnackbar();
  const lastFetchedAvailabilityId = useRef<number | null>(null);

  // Fetch registered users when modal opens
  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        setLoadingUsers(true);
        const users = await getUsersByAvailabilityId(availability.id);
        setRegisteredUsers(users);
        lastFetchedAvailabilityId.current = availability.id;
      } catch (error) {
        snackbar.error("Failed to fetch registered users");
      } finally {
        setLoadingUsers(false);
      }
    };

    if (open && lastFetchedAvailabilityId.current !== availability.id) {
      fetchRegisteredUsers();
    }
  }, [open, availability.id, snackbar]);

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
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          bgcolor: "background.paper",
          minHeight: "60vh",
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle>Edit Availability</DialogTitle>
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ mt: 2 }}>
          <Grid2 container spacing={4}>
            {/* Left side - Edit form */}
            <Grid2 size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Grid2 container spacing={3}>
                  <Grid2 size={12}>
                    <DatePicker
                      label="Date"
                      value={date}
                      onChange={(newValue) => setDate(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </Grid2>
                  <Grid2 size={12}>
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
                  </Grid2>
                  <Grid2 size={6}>
                    <TimePicker
                      label="Start Time"
                      value={startTime}
                      onChange={(newValue) => setStartTime(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </Grid2>
                  <Grid2 size={6}>
                    <TimePicker
                      label="End Time"
                      value={endTime}
                      onChange={(newValue) => setEndTime(newValue)}
                      sx={{ width: "100%" }}
                    />
                  </Grid2>
                </Grid2>
              </LocalizationProvider>
            </Grid2>

            {/* Right side - Registered users */}
            <Grid2 size={6}>
              <Box
                sx={{
                  height: "100%",
                  overflow: "auto",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Registered Users
                </Typography>
                {loadingUsers ? (
                  <Typography>Loading users...</Typography>
                ) : registeredUsers.length > 0 ? (
                  <List>
                    {registeredUsers.map((user) => (
                      <ListItem key={user.id} sx={{ px: 0 }}>
                        <ListItemAvatar>
                          <Avatar
                            src={user.profilePicUrl}
                            alt={user.firstName}
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={`${user.firstName} ${user.lastName}`}
                          secondary={user.email}
                        />
                      </ListItem>
                    ))}
                  </List>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No users registered yet
                  </Typography>
                )}
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AvailabilityDetailsModal;
