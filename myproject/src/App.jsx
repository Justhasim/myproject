import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './component/Home'
import About from './component/About'
import Signin from './component/Signin'
import Signup from './component/Signup'
import Profile from './component/Profile'

export default function App() {
  return (
    <>
 <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/sign-in' element={<Signin/>}  />
    <Route path='/sign-up' element={<Signup/>}  />
    <Route path='profile' element={<Profile/>}  />

   </Routes>
   </BrowserRouter>
    </>

  )
}
