import React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

interface CustomSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: string;
  severity: "success" | "error" | "warning" | "info" | "loading";
  autoHideDuration?: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  open,
  onClose,
  message,
  severity,
  autoHideDuration = 3000,
}) => {
  // Map "loading" to "info" for the Alert component
  const alertSeverity = severity === "loading" ? "info" : severity;

  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration} onClose={onClose}>
      <Alert severity={alertSeverity} onClose={onClose} sx={{ width: "100%" }}>
        {severity === "loading" && (
          <CircularProgress size={16} sx={{ mr: 1 }} />
        )}
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
