import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { contextdata } from '../context/ContextApi';
const Signup =() => {
   const {  handleCurrent}=useContext(contextdata)
    const [user,setUser]=useState({
        name:'',
        email:'',
        password:''
    })
    const navigate=useNavigate();
    const handleInput=(e)=>{
        setUser((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    const handleSubmit=async (e)=>{
         e.preventDefault();
         try {
                let result=await axios.post('http://localhost:7000/signup',user,{
                    headers:{'Content-Type':'application/json'},
                    withCredentials:true
                });
               if(result){
               
               handleCurrent()
                  toast.success("user signup in successfully",{
                                autoClose:true,
                                theme:'colored'
                            });
                    
                setUser({
                    name:'',
                    email:'',
                    password:'',
                })
              }
              
         } catch (error) {
            toast.error(error.message,{
                          autoClose:true,
                          theme:'colored'
                      })
            console.log(error);
         }
    }
  return (
    <div className='w-[100%] h-[100vh] bg-white flex justify-center items-center flex-col gap-[50px]'>
         <h1 className='text-center font-bold text-[30px] text-blue-600 '>signup page</h1>
           <div className='w-[90%] md:w-[30%] mx-auto h-[60%]  shadow-lg shadow-gray-400 rounded-lg p-[10px]'>
           
             <form onSubmit={handleSubmit} className='w-[100%]  h-[90%] flex justify-center flex-col gap-[30px]' action="">
                <input value={user.name} onChange={handleInput} name='name' className='w-[90%]  mx-auto h-[45px] text-blue-600 px-[10px] rounded-lg placeholder:text-blue-600 border-blue-600 border-[1px] outline-blue-400' type="text" placeholder='enter nane...' />
                <input value={user.email} onChange={handleInput} name='email' className='w-[90%] mx-auto h-[45px] text-blue-600 px-[10px] rounded-lg placeholder:text-blue-600 border-blue-600 border-[1px] outline-blue-400' type="text" placeholder='enter email...' />
                <input value={user.password} onChange={handleInput} name='password' className='w-[90%] mx-auto h-[45px] text-blue-600 px-[10px] rounded-lg placeholder:text-blue-600 border-blue-600 border-[1px] outline-blue-400' type="text" placeholder='enter password...' />
                <button type='submit' className='w-[90%] mx-auto h-[45px] rounded-lg bg-[#3778fa] text-white font-semibold text-[18px] cursor-pointer' >signup</button>
             </form>
             <p className='text-center font-semibold text-[18px]'>have an account ? <span className='text-blue-500 text-[19px] cursor-pointer'onClick={()=>navigate('/login')} >login</span></p>
           </div>
    </div>
  )
}

export default Signup