import { useAuth } from "../../contexts/authContext";
import React from "react";

const Home = ()=> {
    const {currentUser} = useAuth();
    return(
        <div>
            <h1>Home</h1>
            <p>Welcome {currentUser ? currentUser.email : "Guest"}</p>
        </div>
    )
}

export default Home;


