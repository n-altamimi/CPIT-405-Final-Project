import { doCreateUserWithEmailAndPassword } from "../../../Firebase/auth";
import { useAuth } from "../../../contexts/authContext";
import {Navigate} from "react-router-dom";
import React, {useState} from "react";

const Register = ()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setErrorMessage("Passwords do not match");
            return;
        }if(!isRegistering){
            setIsRegistering(true);
            await doCreateUserWithEmailAndPassword(email, password);
        }
    }

    return(
        <>
         {userLoggedIn && (<Navigate to="/home" replace={true}/>)}
        <div>
            <h1>Register</h1>
            <form onSubmit={onSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                <label htmlFor="password">Password</label>
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value) } required/>
                <button type="submit">Register</button>
            </form>
        </div>
        </>
    )
    
}

export default Register;