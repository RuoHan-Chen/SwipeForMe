// Author: Jerry Wei
// Time spent: 1 hour

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Profile from "./Profile/Profile";
import { User } from "../../types";
import { getCurrentUser } from "../../clients/userClient";
import Rating from "./Rating";
import ActivityPanel from "./ActivityPanel/ActivityPanel";

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [viewMode, setViewMode] = useState<"buyer" | "seller">("buyer");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getCurrentUser();
        setUser(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        bgcolor: "#2e1a80",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Grid container spacing={3}>
        {/* Profile section */}
        <Profile user={user} viewMode={viewMode} setViewMode={setViewMode} />

        {/* Rating section - more compact */}
        <Rating />

        {/* Combined Transactions/Availabilities section */}
        <ActivityPanel viewMode={viewMode} />
      </Grid>
    </Box>
  );
};

export default Dashboard;
