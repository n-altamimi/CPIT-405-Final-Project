import {auth} from "./firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (email, password) => { 
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response;
   
};

export const doSignInWithEmailAndPassword = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response;
};

export const doSignOut =  () => {
    return auth.signOut();
};
