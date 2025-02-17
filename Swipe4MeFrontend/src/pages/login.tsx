import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { getCurrentUser, googleSignIn } from "../client";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      const loginResponse = await googleSignIn(response.credential);
      login(loginResponse.token); 
      getCurrentUser();
      navigate("/"); 
    }
  };

  return (
    <div className="filler-container">
      <h1 className="filler-title">Login Coming Soon</h1>
      <p className="filler-text">This page is under construction. Check back later!</p>
      <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
    </div>
  );
};

export default Login;
