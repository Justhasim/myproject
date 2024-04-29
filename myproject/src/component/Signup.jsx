import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import OAuth from "./OAuth";



export default function Signup() {
  const [formData, setformData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChanges = (e) => {
    setformData({ ...formData, [e.target.id]: e.target.value });
    
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      const res = await fetch('/Backend/auth/signup',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    setLoading(false);
    console.log(data);
    if(data.statusCode === 500){
      setError(true)
      return;
    }
    navigate('/sign-in')
   
    } catch (error) {
      setLoading(false);
      setError(true);
    }
   
    

  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Signup</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
   
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="p-3 rounded-lg bg-gray-800 text-slate-300 "
          onChange={handleChanges}
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          className="p-3 rounded-lg bg-gray-800 text-slate-300 "
          onChange={handleChanges}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="p-3 rounded-lg bg-gray-800 text-slate-300  "
          onChange={handleChanges}
        />

        <button disabled={loading} className="bg-blue-600 p-3 rounded-lg uppercase text-opacity-80 hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Signup"}
        </button>
        <OAuth />
      </form>
      <div className=" flex gap-2 mt-5">
        <p>Already Have a Account?</p>
        <Link to="/sign-in">
          <span className="text-red-500">Sign Up</span>
        </Link>
      </div>
      <div>
        <p className="font-bold mt-5 text-red-500">{error && "Something Went Wrong!"}</p>
      </div>
    </div>
  );
}
