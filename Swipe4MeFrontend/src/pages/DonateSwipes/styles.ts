import { styled } from "@mui/material/styles";
import { FormControl, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

export const StyledFormControl = styled(FormControl)({
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

// Add styles for the DatePicker and TimePicker
export const StyledDatePicker = styled(DatePicker)({
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

export const StyledTimePicker = styled(TimePicker)({
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

export const StyledButton = styled(Button)({
  backgroundColor: "#f84c7b",
  borderRadius: "2rem",
  padding: "12px 32px",
  fontSize: "1.25rem",
  marginTop: "24px",
  "&:hover": {
    backgroundColor: "#ff5e8a",
  },
});
