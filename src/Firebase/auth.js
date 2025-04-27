import {auth} from "./firebase";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";


export const doCreateUserWithEmailAndPassword = async (email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const doSignInWithEmailAndPassword = async (email, password) => {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const doSignOut =  () => {
    return auth.signOut();
};
