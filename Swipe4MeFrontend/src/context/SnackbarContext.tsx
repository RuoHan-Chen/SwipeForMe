import React, { createContext, useState, useContext, ReactNode } from "react";
import CustomSnackbar from "../components/CustomSnackbar";

type SnackbarSeverity = "success" | "error" | "warning" | "info" | "loading";

interface SnackbarContextType {
  showMessage: (message: string, severity: SnackbarSeverity) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  loading: (message: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<SnackbarSeverity>("info");

  const showMessage = (message: string, severity: SnackbarSeverity) => {
    setMessage(message);
    setSeverity(severity);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const success = (message: string) => showMessage(message, "success");
  const error = (message: string) => showMessage(message, "error");
  const warning = (message: string) => showMessage(message, "warning");
  const info = (message: string) => showMessage(message, "info");
  const loading = (message: string) => showMessage(message, "loading");

  return (
    <SnackbarContext.Provider
      value={{ showMessage, success, error, warning, info, loading }}
    >
      {children}
      <CustomSnackbar
        open={open}
        onClose={handleClose}
        message={message}
        severity={severity}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }

  // Return an object with all the snackbar methods
  return {
    snackbar: {
      success: context.success,
      error: context.error,
      warning: context.warning,
      info: context.info,
      loading: context.loading,
      showMessage: context.showMessage,
    },
  };
};
