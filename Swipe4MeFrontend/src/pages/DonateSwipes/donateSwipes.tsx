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
} from "@mui/material";
import { Grid2 } from "@mui/material";

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
import { useSnackbar } from "../../context/SnackbarContext";

const DonateSwipes: React.FC = () => {
  const [date, setDate] = useState<Dayjs | null>(null);
  const [location, setLocation] = useState<DiningLocation | "">("");
  const [checkInTime, setCheckInTime] = useState<Dayjs | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Dayjs | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { snackbar } = useSnackbar();

  const handleDateChange = (newValue: Date | Dayjs | null) => {
    setDate(newValue as Dayjs | null);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value as DiningLocation);
  };

  const handleCheckInTimeChange = (newValue: Date | Dayjs | null) => {
    setCheckInTime(newValue as Dayjs | null);
  };

  const handleCheckOutTimeChange = (newValue: Date | Dayjs | null) => {
    setCheckOutTime(newValue as Dayjs | null);
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

      try {
        await createAvailability(request);
        snackbar.success("Availability created!");
      } catch (err) {
        snackbar.error("Failed to create availability");
      }
    }
  };

  const menuProps = {
    PaperProps: {
      sx: {
        bgcolor: "rgba(13, 13, 35, 0.95)",
        "& .MuiMenuItem-root": {
          color: "#FFFFFF",
          "&:hover": {
            bgcolor: "rgba(255, 255, 255, 0.1)",
          },
        },
      },
    },
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
          <Grid2
            container
            spacing={3}
            sx={{
              "& .MuiFormControl-root": {
                width: "100%",
                height: "56px", // Make all inputs same height
              },
              "& .MuiInputBase-root": {
                height: "56px",
              },
              "& .MuiOutlinedInput-root": {
                height: "56px",
              },
              "& .MuiInputLabel-root": {
                lineHeight: "1.4375em",
              },
            }}
          >
            <Grid2 size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledDatePicker
                  label="Select Date"
                  value={date}
                  onChange={handleDateChange}
                  disablePast
                  slotProps={{
                    textField: {
                      required: false,
                      error: formSubmitted && !date,
                      InputLabelProps: {
                        required: false,
                      },
                      sx: {
                        width: "100%",
                      },
                    },
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          bgcolor: "rgba(28, 28, 45, 0.95)",
                          color: "#FFFFFF",
                        },
                        "& .MuiPickersDay-root": {
                          color: "#FFFFFF",
                          "&:hover": {
                            bgcolor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&.Mui-selected": {
                            bgcolor: "rgba(255, 255, 255, 0.15)",
                          },
                          "&.Mui-disabled": {
                            color: "#A897CA",
                          },
                        },
                        "& .MuiDayPicker-header": {
                          color: "#FFFFFF",
                        },
                        "& .MuiPickersCalendarHeader-root": {
                          color: "#FFFFFF",
                          "& .MuiPickersCalendarHeader-label": {
                            color: "#FFFFFF",
                          },
                          "& .MuiSvgIcon-root": {
                            color: "#FFFFFF",
                          },
                        },
                        "& .MuiPickersDay-dayOutsideMonth": {
                          color: "#A897CA",
                        },
                        "& .MuiPickersArrowSwitcher-button": {
                          color: "#FFFFFF",
                          "& .MuiSvgIcon-root": {
                            color: "#FFFFFF",
                          },
                        },
                        "& .MuiDayPicker-weekDayLabel": {
                          color: "#FFFFFF !important",
                        },
                        "& .MuiTypography-caption": {
                          color: "#FFFFFF",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={6}>
              <StyledFormControl fullWidth error={formSubmitted && !location}>
                <InputLabel required={false} id="location-label">
                  Select Location
                </InputLabel>
                <Select
                  labelId="location-label"
                  value={location}
                  label="Select Location"
                  onChange={handleLocationChange}
                  required={false}
                  MenuProps={menuProps}
                >
                  {Object.values(DiningLocation).map((location) => (
                    <MenuItem key={location} value={location}>
                      {location}
                    </MenuItem>
                  ))}
                </Select>
              </StyledFormControl>
            </Grid2>
            <Grid2 size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledTimePicker
                  label="Select Check-in Time"
                  value={checkInTime}
                  onChange={handleCheckInTimeChange}
                  slotProps={{
                    textField: {
                      required: false,
                      error: formSubmitted && !checkInTime,
                      InputLabelProps: {
                        required: false,
                      },
                      sx: {
                        width: "100%",
                      },
                    },
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          bgcolor: "rgba(13, 13, 35, 0.98)",
                          color: "#FFFFFF",
                        },
                        "& .MuiClock-pin": {
                          bgcolor: "#FFFFFF",
                        },
                        "& .MuiClockPointer-root": {
                          bgcolor: "#FFFFFF",
                        },
                        "& .MuiClockPointer-thumb": {
                          border: "16px solid #FFFFFF",
                        },
                        "& .MuiClockNumber-root": {
                          color: "#FFFFFF",
                        },
                        "& .MuiPickersArrowSwitcher-button": {
                          color: "#FFFFFF",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid2>
            <Grid2 size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StyledTimePicker
                  label="Select Check-out Time"
                  value={checkOutTime}
                  onChange={handleCheckOutTimeChange}
                  slotProps={{
                    textField: {
                      required: false,
                      error: formSubmitted && !checkOutTime,
                      InputLabelProps: {
                        required: false,
                      },
                      sx: {
                        width: "100%",
                      },
                    },
                    popper: {
                      sx: {
                        "& .MuiPaper-root": {
                          bgcolor: "rgba(13, 13, 35, 0.98)",
                          color: "#FFFFFF",
                        },
                        "& .MuiClock-pin": {
                          bgcolor: "#FFFFFF",
                        },
                        "& .MuiClockPointer-root": {
                          bgcolor: "#FFFFFF",
                        },
                        "& .MuiClockPointer-thumb": {
                          border: "16px solid #FFFFFF",
                        },
                        "& .MuiClockNumber-root": {
                          color: "#FFFFFF",
                        },
                        "& .MuiPickersArrowSwitcher-button": {
                          color: "#FFFFFF",
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid2>
          </Grid2>

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
