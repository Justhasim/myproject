import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7 ">Profile</h1>

      <form className="flex flex-col gap-4">
        <img
          src={currentUser.profilePicture}
          className="rounded-full h-36 w-36 self-center cursor-pointer object-cover"
          alt=""
        />

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="p-3 rounded-lg bg-gray-800 text-slate-300"
        />

        <input
          defaultValue={currentUser.email}
          disabled
          type="email"
          id="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-gray-800 text-slate-300"
        />

        <input
          type="password"
          id="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-gray-800 text-slate-300"
        />

        <button
          className="bg-blue-600 p-3 rounded-lg uppercase text-opacity-80 hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="p-1 flex justify-between">
        <span className="text-red-600 cursor-pointer">Delete Account</span>
        <span className="text-red-600 cursor-pointer">Log Out</span>
      </div>
    </div>
  );
}
