import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../Firebase/auth";
import React from "react";



const Header = ()=> {
    const navigate = useNavigate();
    const {userLoggedIn} = useAuth();
    return(
        <nav>
            {
                userLoggedIn ? (
                    <button onClick={()=>doSignOut().then(()=>navigate("/login"))}>Logout</button>
                ) : (
                    <>
                    <button onClick={()=>navigate("/login")}>Login</button>
                    <button onClick={()=>navigate("/register")}>Register</button>
                    </>
                )
            }
        </nav>
    )
}

export default Header;
