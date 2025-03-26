import { styled } from "@mui/material";

import { Tabs, Tab } from "@mui/material";

// Custom styled Tabs component
export const StyledTabs = styled(Tabs)(({ theme }) => ({
  borderBottom: "1px solid #e0e0e0",
  marginBottom: "20px",
  minHeight: "48px",
  "& .MuiTabs-indicator": {
    backgroundColor: "#5e35b1",
    height: 3,
  },
}));

// Custom styled Tab component
export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  fontSize: "1rem",
  fontWeight: 400,
  color: "rgba(0, 0, 0, 0.6)",
  minWidth: "180px",
  padding: "12px 24px",
  "&.Mui-selected": {
    color: "#5e35b1",
    fontWeight: 600,
  },
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  transition: "all 0.2s ease",
}));
