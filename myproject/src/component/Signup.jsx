import React from 'react'
import { Link } from 'react-router-dom';
export default function Signup() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Signup</h1>
      <form className=' flex flex-col gap-4'>
        <input type="text" placeholder='Username' id='username' className='p-3 rounded-lg bg-gray-800 text-slate-300 '/>
        <input type="email" placeholder='Email' id='email' className='p-3 rounded-lg bg-gray-800 text-slate-300 '/>
        <input type="password" placeholder='Password' id='password' className='p-3 rounded-lg bg-gray-800 text-slate-300  '/>


        <button  className='bg-blue-600 p-3 rounded-lg uppercase text-opacity-80 hover:opacity-95 disabled:opacity-80'>Sign-Up</button>
      </form>
      <div className=" flex gap-2 mt-5">
        <p>Dont Have a Account?</p>
        <Link to='./sign-in'>
        <span className='text-red-500'>Sign In</span>
        </Link>e wi
      </div>
    </div>
  )
}
