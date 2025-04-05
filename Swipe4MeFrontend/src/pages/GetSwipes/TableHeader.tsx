import {
  Grid2,
  Typography,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Checkbox,
  ListItemText,
  Chip,
  Box,
  InputLabel,
} from "@mui/material";
import React, { useState } from "react";
import { DiningLocation } from "../../types";
import { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const TableHeader: React.FC<{
  onDiningHallFilterChange: (selected: DiningLocation[]) => void;
  onDateFilterChange: (date: Date | null) => void;
}> = ({ onDiningHallFilterChange, onDateFilterChange }) => {
  const [selectedDiningHalls, setSelectedDiningHalls] = useState<
    DiningLocation[]
  >([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDiningHallChange = (
    event: SelectChangeEvent<DiningLocation[]>
  ) => {
    const value = event.target.value as DiningLocation[];
    setSelectedDiningHalls(value);
    onDiningHallFilterChange(value);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onDateFilterChange(date);
  };

  return (
    <Grid2
      container
      alignItems="center"
      justifyContent="space-between"
      style={{ width: "90%", margin: "0 auto", paddingTop: "20px" }}
    >
      <Grid2>
        <Typography
          variant="h6"
          sx={{ fontWeight: 600, fontSize: "22.4066px", lineHeight: "34px" }}
        >
          All Students
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#16C098",
            fontWeight: 400,
            fontSize: "14.2588px",
            lineHeight: "21px",
          }}
        >
          Active Students
        </Typography>
      </Grid2>
      <Grid2 container spacing={2} alignItems="center">
        <Grid2>
          <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
            <InputLabel>Dining Halls</InputLabel>
            <Select
              multiple
              value={selectedDiningHalls}
              onChange={handleDiningHallChange}
              input={<OutlinedInput label="Dining Halls" />}
              renderValue={(selected) => (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 0.5,
                    maxWidth: "120px",
                    maxHeight: "25px",
                    overflowY: "auto",
                  }}
                >
                  {selected.map((value) => (
                    <Chip key={value} label={value} />
                  ))}
                </Box>
              )}
            >
              {Object.values(DiningLocation)
                .sort()
                .map((location) => (
                  <MenuItem key={location} value={location}>
                    <Checkbox
                      checked={selectedDiningHalls.indexOf(location) > -1}
                    />
                    <ListItemText primary={location} />
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid2>
        <Grid2>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date"
              value={selectedDate}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  size: "small",
                  sx: { width: 200 },
                },
              }}
            />
          </LocalizationProvider>
        </Grid2>
      </Grid2>
    </Grid2>
  );
};

export default TableHeader;
