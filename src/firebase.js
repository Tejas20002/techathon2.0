// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyClJdNxXd7ew4We20TyftPJ9kq83mU8vcs",
  authDomain: "techathon2-f6fc5.firebaseapp.com",
  projectId: "techathon2-f6fc5",
  storageBucket: "techathon2-f6fc5.appspot.com",
  messagingSenderId: "762223999493",
  appId: "1:762223999493:web:b3e6efdeb0cd7c1abbba6c",
  measurementId: "G-3D6ZPY5LEK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
export { app, auth };
