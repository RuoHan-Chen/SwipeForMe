import {
  Avatar,
  Paper,
  Typography,
  Button,
  Box as MuiBox,
  ToggleButtonGroup,
  ToggleButton,
  Switch,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { Dispatch, SetStateAction } from "react";
import { User } from "../../types";

// Custom styled toggle component to match the design
const StyledToggleBox = styled(MuiBox)(({ theme }) => ({
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

interface StatusToggleProps {
  viewMode: "buyer" | "seller";
  setViewMode: Dispatch<SetStateAction<"buyer" | "seller">>;
}

const StatusToggle: React.FC<StatusToggleProps> = ({
  viewMode,
  setViewMode,
}) => {
  // Calculate slider width and position dynamically
  const getBuyerSliderStyle = () => {
    return {
      left: "4px",
      width: "calc(50% - 4px)",
    };
  };

  const getSellerSliderStyle = () => {
    return {
      left: "calc(50%)",
      width: "calc(50% - 4px)",
    };
  };

  return (
    <MuiBox sx={{ display: "flex", alignItems: "center" }}>
      <Typography
        variant="subtitle1"
        color="text.secondary"
        sx={{ width: "80px" }}
      >
        Status
      </Typography>

      <StyledToggleBox>
        {/* The slider element */}
        <div
          className="toggle-slider"
          style={
            viewMode === "buyer"
              ? getBuyerSliderStyle()
              : getSellerSliderStyle()
          }
        />

        {/* Get Swipes option */}
        <div
          className="toggle-option"
          onClick={() => setViewMode("buyer")}
          style={{
            color: viewMode === "buyer" ? "white" : "rgba(0, 0, 0, 0.6)",
            fontWeight: viewMode === "buyer" ? 600 : 400,
          }}
        >
          Get Swipes
        </div>

        {/* Donate Swipes option */}
        <div
          className="toggle-option"
          onClick={() => setViewMode("seller")}
          style={{
            color: viewMode === "seller" ? "white" : "rgba(0, 0, 0, 0.6)",
            fontWeight: viewMode === "seller" ? 600 : 400,
          }}
        >
          Donate Swipes
        </div>
      </StyledToggleBox>
    </MuiBox>
  );
};

interface ProfileProps {
  user: User | null;
  viewMode: "buyer" | "seller";
  setViewMode: Dispatch<SetStateAction<"buyer" | "seller">>;
}

const Profile: React.FC<ProfileProps> = ({ user, viewMode, setViewMode }) => {
  if (!user) {
    return (
      <Grid size={6}>
        <Paper
          sx={{
            p: 3,
            borderRadius: 4,
            minHeight: "200px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Loading profile...</Typography>
        </Paper>
      </Grid>
    );
  }

  return (
    <Grid size={6}>
      <Paper sx={{ p: 3, borderRadius: 4 }}>
        <Grid container alignItems="center" spacing={3}>
          <Grid
            size={3}
            sx={{ display: "flex", justifyContent: "flex-start", pl: 2 }}
          >
            <Avatar
              alt={`${user.firstName} ${user.lastName}`}
              src={user.profilePicUrl}
              sx={{ width: 120, height: 120 }}
              slotProps={{
                img: {
                  referrerPolicy: "no-referrer",
                },
              }}
            />
          </Grid>
          <Grid size={9} sx={{ pl: 2 }}>
            {/* Header with name and edit button */}
            <MuiBox
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                {`Hi, ${user.firstName}`}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#1de9b6",
                  color: "white",
                  "&:hover": { bgcolor: "#00bfa5" },
                  borderRadius: "8px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  fontWeight: "bold",
                  padding: "6px 16px",
                }}
              >
                Edit
              </Button>
            </MuiBox>

            <Typography
              variant="body1"
              sx={{ mb: 2, display: "flex", alignItems: "center" }}
            >
              <span style={{ marginRight: "8px" }}>👋</span>
              Ready to swap some swipes?
            </Typography>

            {/* Email section */}
            <MuiBox sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ width: "80px" }}
              >
                Email
              </Typography>
              <Typography variant="body1">{user.email}</Typography>
            </MuiBox>

            {/* Status section */}
            <StatusToggle viewMode={viewMode} setViewMode={setViewMode} />
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Profile;
