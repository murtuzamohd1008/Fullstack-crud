import React, { useContext, useState } from 'react'
import profile from '../assets/profile.webp'
import axios from 'axios';
import { contextdata } from '../context/ContextApi';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [toggle,setToggle]=useState(false);
  const {currentuser,handleCurrent}=useContext(contextdata);
  const navigate=useNavigate();
    const handleLogout=async ()=>{
        try {
            let result=await axios.get('http://localhost:7000/logout',{withCredentials:true});
            console.log(result)
            if(result.data.success===true){
                console.log("logout")
                navigate('/login');
                handleCurrent()
            }
           
          
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-[100%] h-[70px] shadow-lg shadow-gray-300 md:px-[100px] fixed top-0'>
        <nav className='w-[100%] h-[100%] flex justify-between items-center'>
     <h1 className='md:text-[30px] text-[24px] text-green-400 capitalize font-bold cursor-pointer'>full stack crud</h1>
         <div className='relative'>
            <img onClick={()=>setToggle(!toggle)} className='w-[50px] cursor-pointer h-[50px] rounded-full' src={profile} alt="" />
            <div style={{
                 opacity: toggle ? 1 : 0,
    pointerEvents: toggle ? "auto" : "none"
            }}
            className={`absolute  top-[70px] ${toggle?" right-[10px] md:right-[-80px]":"right-[-400px]"}  transition-all  duration-300 w-[150px] md:w-[200px] h-[100px] bg-[#56f556] shadow-lg rounded-lg shadow-gray-200`}>
                  <div className='flex justify-center items-center flex-col font-bold text-white relative overflow-x-hidden'>
                    <p onClick={()=>setToggle(false)} className='relative left-[60px] md:left-[70px] top-[6px] cursor-pointer'>X</p>
                    {
                        currentuser? <p className='mt-[20px] cursor-pointer' onClick={()=>{handleLogout();
                            setToggle(false)
                        }}>logout</p>: <p className='mt-[20px] cursor-pointer' onClick={()=>{navigate('/login');
                            setToggle(false)
                        }}>login</p>
                    }
                   
                  </div>
            </div>
         </div>
        </nav>
    </div>
  )
}

export default Navbar