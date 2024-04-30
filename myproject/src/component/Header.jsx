// import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-800 ">
        <div className=" flex justify-between items-center max-md: auto p-3 ">
<Link to='/'>
      <h1 to='/' className=" ml-3 font-bold">Thedsstudent</h1>
      </Link>
      
      <ul className="flex gap-4">
      <Link to='/'>
        <li>Home</li>
        </Link>
        <Link to='/about'>
        <li>About</li>
        </Link>

        <Link to='/profile'>
          {currentUser ? (
            <img src={ currentUser.profilePicture } className="rounded-full object-cover h-7 w-7" alt="profile" />
          ):(
        <li>Sign in</li>
        )}
        </Link>
      </ul>
      </div>
    </div>
  );
}
