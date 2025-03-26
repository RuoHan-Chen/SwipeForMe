import { Box, styled } from "@mui/material";

// Custom styled toggle component to match the design
export const StyledToggleBox = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  position: "relative",
  backgroundColor: "#f1f1f1",
  borderRadius: "30px",
  padding: "4px",
  width: "280px",
  height: "40px",
  alignItems: "center",
  "& .toggle-option": {
    padding: "0",
    width: "50%",
    height: "100%",
    borderRadius: "30px",
    fontWeight: 500,
    position: "relative",
    zIndex: 1,
    transition: "color 0.3s ease",
    fontSize: "0.875rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    textAlign: "center",
  },
  "& .toggle-slider": {
    position: "absolute",
    top: "4px",
    height: "calc(100% - 8px)",
    borderRadius: "30px",
    backgroundColor: "#8A2BE2",
    transition: "all 0.3s ease",
    zIndex: 0,
  },
}));
