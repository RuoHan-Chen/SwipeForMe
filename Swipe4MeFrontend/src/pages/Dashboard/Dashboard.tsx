// Author: Jerry Wei
// Time spent: 1 hour

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Profile from "./Profile";
import { User } from "../../clients/userClient";
import { getCurrentUser } from "../../clients/userClient";
import Rating from "./Rating";
import ActivityPanel from "./ActivityPanel/ActivityPanel";
const Dashboard: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

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
    <Box sx={{ flexGrow: 1, p: 3, bgcolor: "#2e1a80" }}>
      <Grid container spacing={3}>
        {/* Profile section */}
        <Profile user={user} />

        {/* Rating section - more compact */}
        <Rating />

        {/* Combined Transactions/Availabilities section */}
        <ActivityPanel />
      </Grid>
    </Box>
  );
};

export default Dashboard;
