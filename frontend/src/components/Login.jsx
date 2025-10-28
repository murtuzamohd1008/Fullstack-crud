import axios from 'axios';
import React, { useState } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { contextdata } from '../context/ContextApi';

const Login = () => {
    const {  handleCurrent}=useContext(contextdata)
    const navigate=useNavigate();
    const [user,setUser]=useState({
        email:'',
        password:'',
    })

    const handleInput=(e)=>{
        setUser((prev)=>({...prev,[e.target.name]:e.target.value}))
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        try {
            let result=await axios.post('http://localhost:7000/login',user,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            })
              await handleCurrent()
            setUser({
                email:'',
                password:''
            })
            toast.success("user logged in successfully",{
                autoClose:true,
                theme:'colored'
            })
            console.log(result);
           setTimeout(()=>navigate('/'),500)
        } catch (error) {
            toast.error(error.message,{
                autoClose:true,
                theme:'colored'
            })
            console.log(error.message)
        }
    }
  return (
        <div className='w-[100%] h-[100vh] bg-white flex justify-center items-center flex-col gap-[50px]'>
         <h1 className='text-center font-bold text-[30px] text-blue-600 '>login page</h1>
           <div className='w-[90%] md:w-[30%] mx-auto h-[50%]  shadow-lg shadow-gray-400 rounded-lg p-[10px]'>
           
             <form onSubmit={handleSubmit} className='w-[100%]  h-[90%] flex justify-center flex-col gap-[30px]' action="">
               
                <input name='email' value={user.email} onChange={handleInput} className='w-[90%] mx-auto h-[45px] text-blue-600 px-[10px] rounded-lg placeholder:text-blue-600 border-blue-600 border-[1px] outline-blue-400' type="text" placeholder='enter email...' />
                <input name='password' value={user.password} onChange={handleInput} className='w-[90%] mx-auto h-[45px] text-blue-600 px-[10px] rounded-lg placeholder:text-blue-600 border-blue-600 border-[1px] outline-blue-400' type="text" placeholder='enter password...' />
                <button className='w-[90%] mx-auto h-[45px] rounded-lg bg-[#3778fa] text-white font-semibold text-[18px] cursor-pointer' >login</button>
             </form>
             <p className='text-center font-semibold text-[18x]'>don't have an account ? <span className='text-blue-500 text-[19px] cursor-pointer' onClick={()=>navigate('/signup')}>signup</span></p>
           </div>
    </div>
  )
}

export default Login