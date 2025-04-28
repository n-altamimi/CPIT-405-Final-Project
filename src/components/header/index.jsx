import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../Firebase/auth";
import React from "react";
import "./header.css";


const Header = ()=> {
    const navigate = useNavigate();
    const {userLoggedIn} = useAuth();
    return(
        <div className="header">
            <div className="header-logo"> kau calendar</div>
            <nav>
            {
                userLoggedIn ? (
                    <>
                    <button onClick={()=>navigate("/login")}>My favorit </button>
                    <button onClick={()=>doSignOut().then(()=>navigate("/login"))}>Logout</button>
                    </>
                ) : (
                    <>
                    <button onClick={()=>navigate("/login")}>Login</button>
                    <button onClick={()=>navigate("/register")}>Register</button>
                    </>
                )
            }
            </nav>
        </div>
    )
}

export default Header;
