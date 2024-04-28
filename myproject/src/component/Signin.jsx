import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Signin() {
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
      const res = await fetch('/Backend/auth/signin',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
    setLoading(false);
    if(data.statusCode === 500){
      setError(true)
      return;
    }
    navigate('/')
    } catch (error) {
      setLoading(false);
      setError(true);
    }
   
    

  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
   

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
      </form>
      <div className=" flex gap-2 mt-5">
        <p>Dont Have a Account?</p>
        <Link to="/sign-up">
          <span className="text-red-500">Sign In</span>
        </Link>
      </div>
      <div>
        <p className="font-bold mt-5 text-red-500">{error && "Something Went Wrong!"}</p>
      </div>
    </div>
  );
}
