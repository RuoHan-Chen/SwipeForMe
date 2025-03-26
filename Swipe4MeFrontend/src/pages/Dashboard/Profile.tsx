import {
  Avatar,
  Paper,
  Typography,
  Button,
  Box as MuiBox,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import React, { Dispatch, SetStateAction } from "react";
import { User } from "../../types";

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

  const handleToggleChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: "buyer" | "seller"
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

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
          <Grid size={7} sx={{ pl: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {`Hi, ${user.firstName}`}
            </Typography>
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
            <MuiBox sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                sx={{ width: "80px" }}
              >
                Status
              </Typography>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleToggleChange}
                aria-label="swipe mode"
                size="small"
                sx={{
                  "& .MuiToggleButtonGroup-grouped": {
                    border: "1px solid #e0e0e0",
                    "&:not(:first-of-type)": {
                      borderRadius: "24px",
                      borderLeft: "1px solid #e0e0e0",
                    },
                    "&:first-of-type": {
                      borderRadius: "24px",
                    },
                  },
                }}
              >
                <ToggleButton
                  value="buyer"
                  aria-label="get swipes"
                  sx={{
                    px: 2,
                    color: viewMode === "buyer" ? "white" : "text.secondary",
                    bgcolor: viewMode === "buyer" ? "#8A2BE2" : "transparent",
                    "&.Mui-selected": {
                      bgcolor: "#8A2BE2",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#7B1FA2",
                      },
                    },
                    "&:hover": {
                      bgcolor:
                        viewMode === "buyer"
                          ? "#7B1FA2"
                          : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  Get Swipes
                </ToggleButton>
                <ToggleButton
                  value="seller"
                  aria-label="donate swipes"
                  sx={{
                    px: 2,
                    color: viewMode === "seller" ? "white" : "text.secondary",
                    bgcolor: viewMode === "seller" ? "#8A2BE2" : "transparent",
                    "&.Mui-selected": {
                      bgcolor: "#8A2BE2",
                      color: "white",
                      "&:hover": {
                        bgcolor: "#7B1FA2",
                      },
                    },
                    "&:hover": {
                      bgcolor:
                        viewMode === "seller"
                          ? "#7B1FA2"
                          : "rgba(0, 0, 0, 0.04)",
                    },
                  }}
                >
                  Donate Swipes
                </ToggleButton>
              </ToggleButtonGroup>
            </MuiBox>
          </Grid>
          <Grid size={2} container justifyContent="flex-end">
            <Button
              variant="contained"
              sx={{
                bgcolor: "#1de9b6",
                color: "white",
                "&:hover": { bgcolor: "#00bfa5" },
              }}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Profile;
