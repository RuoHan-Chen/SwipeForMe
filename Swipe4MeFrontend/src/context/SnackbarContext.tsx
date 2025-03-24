import React, { createContext, useState, useContext, ReactNode } from "react";
import CustomSnackbar from "../components/CustomSnackbar";

type SnackbarSeverity = "success" | "error" | "warning" | "info";

interface SnackbarContextType {
  showMessage: (message: string, severity: SnackbarSeverity) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
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

  return (
    <SnackbarContext.Provider
      value={{ showMessage, success, error, warning, info }}
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

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
