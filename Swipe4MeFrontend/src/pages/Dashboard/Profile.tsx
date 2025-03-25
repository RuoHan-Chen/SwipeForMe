import { Avatar, Paper, Typography, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";
import { User } from "../../types";

interface ProfileProps {
  user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  if (!user) {
    return (
      <Grid size={8}>
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
        <Grid container>
          <Grid size={3}>
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
          <Grid size={7}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              {`${user.firstName} ${user.lastName}`}
            </Typography>
            <Grid container spacing={4}>
              <Grid size={6}>
                <Typography variant="subtitle1" color="text.secondary">
                  Email
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Grid>
            </Grid>
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
              Edit Profile
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Profile;
