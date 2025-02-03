import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { getCurrentUser, googleSignIn } from "./client";

function App() {
  const [count, setCount] = useState(0);

  const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
    const loginResponse = await googleSignIn(response.credential!!);
    localStorage.setItem("token", loginResponse.token);
    getCurrentUser();
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <GoogleLogin onSuccess={handleGoogleLoginSuccess} />
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
