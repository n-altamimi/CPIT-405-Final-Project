import { doSignInWithEmailAndPassword } from "../../../Firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";
import "./login.css";
const Login = () => {
    const { userLoggedIn } = useAuth();
  
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [signingIn, setSigningIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
  
    const onSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");
      setSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setSigningIn(false);
      }
    };
  
    return (
      <div className="login-container">
        {userLoggedIn && <Navigate to="/home" replace={true} />}
        <h1>Login</h1>
        {errorMessage && <p style={{ color: "red" }}>{"Invalid email or password"}</p>}
        <form onSubmit={onSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={signingIn}>
            {signingIn ? "logining in..." : "Login"}
          </button>
        </form>
      </div>
    );
  };

  export default Login;