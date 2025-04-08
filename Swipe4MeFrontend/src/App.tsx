// Authors: RuoHan Chen, Xinying Luo, Steven Yi
// Time spent: 3 hours

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard/Dashboard";
import GetSwipes from "./pages/GetSwipes/getSwipes.tsx";
import TradeSwipes from "./pages/DonateSwipes/donateSwipes.tsx";
import TransactionHistory from "./pages/transactionHistory.tsx";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";
import PrivateRoute from "./utils/router.tsx";
import Rating from "./pages/rating.tsx";
import { SnackbarProvider } from "./context/SnackbarContext";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2F1893",
        dark: "#1E0E62",
      },
    },
  });

  return (
    <SnackbarProvider>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/getSwipes"
                element={
                  <PrivateRoute>
                    <GetSwipes />
                  </PrivateRoute>
                }
              />
              <Route
                path="/donateSwipes"
                element={
                  <PrivateRoute>
                    <TradeSwipes />
                  </PrivateRoute>
                }
              />
              <Route
                path="/transaction"
                element={
                  <PrivateRoute>
                    <TransactionHistory />
                  </PrivateRoute>
                }
              />
              <Route
                path="/rating/:transactionId"
                element={
                  <PrivateRoute>
                    <Rating />
                  </PrivateRoute>
                }
              />
              <Route
                path="*"
                element={
                  <h1 style={{ textAlign: "center" }}>404 - Page Not Found</h1>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}

export default App;
