import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import Login from "./pages/login";
import Profile from "./pages/profile";
import BuySwipes from "./pages/donateSwipes.tsx";
import TradeSwipes from "./pages/tradeSwipes";
import TransactionHistory from "./pages/transactionHistory.tsx";
import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/buySwipes" element={<BuySwipes />} />
          <Route path="/tradeSwipes" element={<TradeSwipes />} />
          <Route path="/transaction" element={<TransactionHistory />} />
          <Route
            path="*"
            element={
              <h1 style={{ textAlign: "center" }}>404 - Page Not Found</h1>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
