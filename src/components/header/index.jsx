import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../Firebase/auth";
import React from "react";
import "./header.css";


const Header = ()=> {
    const navigate = useNavigate();
    const {userLoggedIn,role} = useAuth();
    
    return(
        <div className="header">
            <div className="header-logo"> Kau Calendar</div>
            <nav>
            {
                userLoggedIn ? (
                    <>
                    <button onClick={()=>navigate("/home")}>Home </button>
                    {(role === 1 || role === 2) && (
                        <button onClick={()=>navigate("/manage")}>Create/Manage</button>
                    )}
                    <button onClick={()=>navigate("/favorites")}>My favorit </button>
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
