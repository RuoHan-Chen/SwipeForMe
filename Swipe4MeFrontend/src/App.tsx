// Authors: RuoHan Chen, Xinying Luo, Steven Yi
// Time spent: 3 hours

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import GetSwipes from "./pages/getSwipes";
import TradeSwipes from "./pages/donateSwipes.tsx";
import TransactionHistory from "./pages/transactionHistory.tsx";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import createTheme from "@mui/material/styles/createTheme";
import { ThemeProvider } from "@mui/material/styles";

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
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/getSwipes" element={<GetSwipes />} />
            <Route path="/donateSwipes" element={<TradeSwipes />} />
            <Route path="/transaction" element={<TransactionHistory />} />
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
  );
}

export default App;
