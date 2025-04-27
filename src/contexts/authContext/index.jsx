import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../Firebase/firebase";
import React, {useContext, useEffect, useState} from "react";

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setuserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    function initializeUser(user){
        if(user){
            setCurrentUser(user);
            setuserLoggedIn(true);
        }else {
            setCurrentUser(null);
            setuserLoggedIn(false);
        }
        setLoading(false);
    }

    const value = {
        currentUser,
        userLoggedIn,
        loading,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

