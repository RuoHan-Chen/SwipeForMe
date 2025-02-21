import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
// import { getCurrentUser, googleSignIn } from "./client";
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
  // const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
  //   if (response.credential) {
  //     const loginResponse = await googleSignIn(response.credential);
  //     localStorage.setItem("token", loginResponse.token);
  //     getCurrentUser();
  //   }
  // };

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
        {/* <Profile
          name="RuoHan Chen"
          email="ruohan@gamil.com"
          age={21}
          class="Sophomore"
          phoneNumber="+1 7306185390"
          avatarUrl="/path-to-your-avatar.jpg"
        /> */}
        {/* <GoogleLogin onSuccess={handleGoogleLoginSuccess} /> */}
      </Router>
    </AuthProvider>
  );
}

export default App;
