import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './component/Home'
import About from './component/About'
import Signin from './component/Signin'
import Signup from './component/Signup'
import Profile from './component/Profile'
import Header  from './component/Header';
import PrivateRoute from './component/PrivateRoute';

document.body.style.backgroundColor = "#0f172a"
export default function App() {
  return (
    <>
    <div className='text-white font-semibold'>
 <BrowserRouter>
 <Header/>
   <Routes>
    <Route path='/' element={<Home/>} />
     <Route path='/about' element={<About/>} />
    <Route path='/sign-in' element={<Signin/>}  />
    <Route path='/sign-up' element={<Signup/>}  />
    <Route element={<PrivateRoute />} >
        <Route path='/profile' element={<Profile/>} />
      </Route>
    </Routes>
   </BrowserRouter>
   </div>
    </>

  )
}
