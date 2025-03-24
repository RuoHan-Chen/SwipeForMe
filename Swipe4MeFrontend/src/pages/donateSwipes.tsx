// Author: RuoHan Chen
// Time spent: 15 minutes

import React, { useState } from "react";
import styles from "../styles/DonateSwipes.module.css";
import {
  Typography,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";

// Custom styled components
const StyledFormControl = styled(FormControl)({
  margin: "8px",
  minWidth: 200,
  "& .MuiOutlinedInput-root": {
    borderRadius: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused": {
      color: "white",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "& .MuiSelect-select": {
    color: "white",
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#f84c7b",
  borderRadius: "2rem",
  padding: "12px 32px",
  fontSize: "1.25rem",
  marginTop: "24px",
  "&:hover": {
    backgroundColor: "#ff5e8a",
  },
});

const StyledDatePicker = styled(DatePicker)({
  width: "100%",
  "& .MuiOutlinedInput-root": {
    borderRadius: "2rem",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.2)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)",
    },
  },
  "& .MuiInputLabel-root": {
    color: "rgba(255, 255, 255, 0.7)",
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "rgba(255, 255, 255, 0.5)",
  },
  "& .MuiSvgIcon-root": {
    color: "white",
  },
  "& .MuiInputBase-input": {
    color: "white",
  },
});

const DonateSwipes: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState<string>("");
  const [checkInTime, setCheckInTime] = useState<string>("");
  const [checkOutTime, setCheckOutTime] = useState<string>("");

  const handleDateChange = (newValue: Dayjs | null) => {
    setDate(newValue);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as string);
  };

  const handleCheckInTimeChange = (event: SelectChangeEvent) => {
    setCheckInTime(event.target.value as string);
  };

  const handleCheckOutTimeChange = (event: SelectChangeEvent) => {
    setCheckOutTime(event.target.value as string);
  };

  const handleConfirm = () => {
    // Handle form submission logic here
    console.log({ date, location, checkInTime, checkOutTime });
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
                  onChange={(newValue) => {
                    if (newValue) {
                      handleDateChange(newValue);
                    }
                  }}
                  disablePast
                  sx={{ m: 1 }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledFormControl fullWidth>
                <InputLabel id="location-label">Select Location</InputLabel>
                <Select
                  labelId="location-label"
                  value={location}
                  label="Select Location"
                  onChange={handleLocationChange}
                >
                  <MenuItem value="dining-hall-1">Dining Hall 1</MenuItem>
                  <MenuItem value="dining-hall-2">Dining Hall 2</MenuItem>
                  {/* Add more location options as needed */}
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledFormControl fullWidth>
                <InputLabel id="check-in-label">
                  Select Check-in Time
                </InputLabel>
                <Select
                  labelId="check-in-label"
                  value={checkInTime}
                  label="Select Check-in Time"
                  onChange={handleCheckInTimeChange}
                >
                  <MenuItem value="8:00">8:00 AM</MenuItem>
                  <MenuItem value="9:00">9:00 AM</MenuItem>
                  {/* Add more time options as needed */}
                </Select>
              </StyledFormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledFormControl fullWidth>
                <InputLabel id="check-out-label">
                  Select Check-out Time
                </InputLabel>
                <Select
                  labelId="check-out-label"
                  value={checkOutTime}
                  label="Select Check-out Time"
                  onChange={handleCheckOutTimeChange}
                >
                  <MenuItem value="12:00">12:00 PM</MenuItem>
                  <MenuItem value="13:00">1:00 PM</MenuItem>
                  {/* Add more time options as needed */}
                </Select>
              </StyledFormControl>
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
