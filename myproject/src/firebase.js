// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-d1630.firebaseapp.com",
  projectId: "mern-auth-d1630",
  storageBucket: "mern-auth-d1630.appspot.com",
  messagingSenderId: "255400963019",
  appId: "1:255400963019:web:9e047e4f35f80a912b244e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);