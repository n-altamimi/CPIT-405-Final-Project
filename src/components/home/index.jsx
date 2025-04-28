import { useAuth } from "../../contexts/authContext";
import React from "react";

const Home = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Home</h1>
            <p>
                Welcome{" "}
                {currentUser
                    ? (currentUser.displayName || currentUser.email)
                    : "Guest"}
            </p>
        </div>
    );
};

export default Home;


