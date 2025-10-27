import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Update from './components/Update'
import Home from './components/Home'
import { useContext } from 'react'
import {contextdata} from './context/ContextApi.jsx'
import { Navigate } from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import Navbar from './components/Navbar.jsx'
function App() {
const {handleCurrent, currentuser,gettodo}=useContext(contextdata)
  console.log(currentuser)
  useEffect(()=>{
    handleCurrent();
   gettodo();
  },[])
  return (
    <>
    <Navbar/>
       <Routes>
        <Route path='/' element={currentuser?<Home/>:<Navigate to='/signup' />}/>
        <Route path='/login' element={!currentuser?<Login/>:<Navigate to='/'/>}/>
        <Route path='/signup' element={!currentuser?<Signup/>:<Navigate to='/' />}/>
        <Route path='/update' element={<Update/>}/>
       </Routes>
       <ToastContainer/>
    </>
  )
}

export default App
