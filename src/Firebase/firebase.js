// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB0v7Yb2k94rB4fRUc5UNDRJhSUufjsmpw",
  authDomain: "kau-calendar.firebaseapp.com",
  projectId: "kau-calendar",
  storageBucket: "kau-calendar.firebasestorage.app",
  messagingSenderId: "105992661948",
  appId: "1:105992661948:web:712f51586f7a9de56a19b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};