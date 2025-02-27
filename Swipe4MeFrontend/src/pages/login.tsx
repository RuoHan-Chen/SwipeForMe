// Author: Steven Yi
// Time spent: 1 hour

import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { googleSignIn, LoginResponse } from "../clients/authClient";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { getCurrentUser } from "../clients/userClient";

const GradientCircles = () => {
  return (
    <Box
      sx={{
        position: "absolute",
        left: "40%",
        top: "40%",
        transform: "translate(-50%, -50%)",
        width: "600px",
        height: "600px",
        zIndex: 0,
      }}
    >
      {/* Large blue circle */}
      <Box
        sx={{
          position: "absolute",
          left: "15%",
          top: "50%",
          width: "400px",
          height: "400px",
          background: "linear-gradient(180deg, #42DDFF 0%, #1170FF 100%)",
          filter: "blur(60px)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
          opacity: 0.7,
        }}
      />

      {/* Medium pink circle */}
      <Box
        sx={{
          position: "absolute",
          left: "25%",
          top: "30%",
          width: "300px",
          height: "300px",
          background:
            "linear-gradient(180deg, #F22FB0 0%, #F58A25 50%, #7061A3 100%)",
          filter: "blur(70px)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          opacity: 0.5,
        }}
      />

      {/* Small purple circle */}
      <Box
        sx={{
          position: "absolute",
          left: "0%",
          top: "65%",
          width: "200px",
          height: "200px",
          background: "linear-gradient(180deg, #7D40FF 0%, #F58A25 100%)",
          filter: "blur(50px)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          opacity: 0.6,
        }}
      />
    </Box>
  );
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      const loginResponse: LoginResponse = await googleSignIn(
        response.credential
      );
      login(loginResponse.token, loginResponse.userId);
      getCurrentUser();
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "primary",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        p: 2,
        pt: { xs: 12, md: 16, lg: 24 },
        pr: { xs: 2, md: 12, lg: 24 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      <GradientCircles />

      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: 400,
          borderRadius: 3,
          bgcolor: "background.paper",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Stack spacing={3}>
          <Typography
            variant="h4"
            component="h1"
            align="center"
            sx={{
              fontWeight: "bold",
              color: "primary.dark",
            }}
          >
            Sign Up Now
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              "& > div": {
                transform: "scale(1.3)",
                my: 1,
              },
            }}
          >
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
          </Box>

          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
            <Divider sx={{ flex: 1 }} />
            <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
              or
            </Typography>
            <Divider sx={{ flex: 1 }} />
          </Box>

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
          </Box> */}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Login;
