import React from "react";
import { FaGoogle } from "react-icons/fa";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const dispatch = useDispatch();
  const handleGoogleClick = async () => {
   try {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    const result = await signInWithPopup(auth, provider);
    const res = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      }),
    });
    const data = await res.json();
    dispatch(signInSuccess(data));
    
   } catch (error) {
    console.log('cannot login with goole', error);
   }
  }
  return (
    <button onClick={handleGoogleClick} type="button" className="bg-gray-800 p-3 rounded-lg uppercase text-opacity-80 hover:opacity-90 border-blue-600 border-2 border-x-4 disabled:opacity-80 flex items-center justify-center shadow-lg shadow-blue-500/30">
     <FaGoogle className="flex items-center mr-2"  />
      continue with google
    </button>
  );
}
