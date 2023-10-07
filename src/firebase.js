// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyCgKX3DSNgVWMIPCjzKApjRikYg8zVUMkw",
    authDomain: "calendar-dfadf.firebaseapp.com",
    projectId: "calendar-dfadf",
    storageBucket: "calendar-dfadf.appspot.com",
    messagingSenderId: "667752922347",
    appId: "1:667752922347:web:273d48c850bd9a70d352ae",
    measurementId: "G-QKG2TSBY49"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };