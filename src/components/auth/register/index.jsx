import { doCreateUserWithEmailAndPassword } from "../../../Firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import { Navigate } from "react-router-dom";
import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../../Firebase/firebase";
import "./register.css";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
    const { userLoggedIn } = useAuth();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }
        if (!isRegistering) {
            setIsRegistering(true);
            try {
                await doCreateUserWithEmailAndPassword(email, password);
                await updateProfile(auth.currentUser, { displayName: username });
                // Save user role in Firestore
                await setDoc(doc(db, "users", auth.currentUser.uid), {
                    username,
                    email,
                    role: 3 // 3 = student (default)
                });
            } catch (error) {
                setErrorMessage(error.message);
            }
            setIsRegistering(false);
        }
    };

    if (userLoggedIn) {
        return <Navigate to="/home" replace={true} />;
    }

    return (
        <div className="register-container">
            <h1>Register</h1>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <form onSubmit={onSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
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
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={isRegistering}>
                    {isRegistering ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
};

export default Register;