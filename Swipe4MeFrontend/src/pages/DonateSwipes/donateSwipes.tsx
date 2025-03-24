// Author: RuoHan Chen
// Time spent: 15 minutes

import React, { useState } from "react";
import styles from "../../styles/DonateSwipes.module.css";
import {
  Typography,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Box,
  Container,
  Grid,
} from "@mui/material";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import {
  StyledFormControl,
  StyledDatePicker,
  StyledTimePicker,
  StyledButton,
} from "./styles";
import { DiningLocation } from "../../types";
import {
  createAvailability,
  CreateAvailabilityRequest,
} from "../../clients/availabilityClient";

const DonateSwipes: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState<DiningLocation | "">("");
  const [checkInTime, setCheckInTime] = useState<Dayjs | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Dayjs | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as DiningLocation);
  };

  const handleCheckInTimeChange = (newValue: Dayjs | null) => {
    setCheckInTime(newValue);
  };

  const handleCheckOutTimeChange = (newValue: Dayjs | null) => {
    setCheckOutTime(newValue);
  };

  const handleConfirm = async () => {
    setFormSubmitted(true);

    if (date && location && checkInTime && checkOutTime) {
      // Create date objects with the correct date and time components
      const startDateTime = date
        .hour(checkInTime.hour())
        .minute(checkInTime.minute());
      const endDateTime = date
        .hour(checkOutTime.hour())
        .minute(checkOutTime.minute());

      // Format in ISO format but preserve the Central time zone information
      // This creates strings like "2023-05-15T14:30:00.000-05:00" (with proper timezone offset)
      const startTimeISO =
        startDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS") +
        startDateTime.format("Z");
      const endTimeISO =
        endDateTime.format("YYYY-MM-DDTHH:mm:ss.SSS") + endDateTime.format("Z");

      // Find the enum key that corresponds to the selected value
      const locationKey = Object.keys(DiningLocation).find(
        (key) => DiningLocation[key as keyof typeof DiningLocation] === location
      );

      const request: CreateAvailabilityRequest = {
        userId: parseInt(localStorage.getItem("userId")!!),
        location: locationKey as string,
        startTime: startTimeISO,
        endTime: endTimeISO,
      };

      console.log("Sending request:", request);

      const response = await createAvailability(request);
      console.log("Response:", response);
    }
  };

  return (
    <div className={styles.backgroundContainer}>
      <Container
        maxWidth="lg"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box sx={{ textAlign: "center", color: "white", mb: 6 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 600,
              mb: 2,
            }}
          >
            Donate Your Extra Swipes
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1rem", md: "1.25rem" },
              maxWidth: "800px",
              mx: "auto",
              lineHeight: 1.6,
            }}
          >
            Got a meal you won't use? Someone else could really use it — and
            they might just thank you in ways that count
          </Typography>
        </Box>

        <Box sx={{ maxWidth: "900px", mx: "auto", width: "100%" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker
                  label="Select Date"
                  value={date}
                  onChange={handleDateChange}
                  disablePast
                  sx={{ m: 1 }}
                  slotProps={{
                    textField: {
                      required: true,
                      error: formSubmitted && !date,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledFormControl fullWidth error={formSubmitted && !location}>
                <InputLabel required id="location-label">
                  Select Location
                </InputLabel>
                <Select
                  labelId="location-label"
                  value={location}
                  label="Select Location"
                  onChange={handleLocationChange}
                >
                  {Object.values(DiningLocation).map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledTimePicker
                  label="Select Check-in Time"
                  value={checkInTime}
                  onChange={handleCheckInTimeChange}
                  sx={{ m: 1 }}
                  slotProps={{
                    textField: {
                      required: true,
                      error: formSubmitted && !checkInTime,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledTimePicker
                  label="Select Check-out Time"
                  value={checkOutTime}
                  onChange={handleCheckOutTimeChange}
                  sx={{ m: 1 }}
                  slotProps={{
                    textField: {
                      required: true,
                      error: formSubmitted && !checkOutTime,
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
            <StyledButton variant="contained" onClick={handleConfirm}>
              Confirm
            </StyledButton>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default DonateSwipes;
