import React, { useContext, useEffect, useState } from 'react'
import { contextdata } from '../context/ContextApi'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Update = () => {
  const {update,setUpdate,alltodo,gettodo}=useContext(contextdata);
  const [val,setVal]=useState('')
   const navigate=useNavigate()
  const findOldtodo=()=>{
      let findOld=alltodo.find((item)=>item._id===update);
     
      //.log(findOld)
      setVal(findOld?.description)
  }
  useEffect(()=>{
    findOldtodo()
  },[update])
  const handleUpdate=async(e)=>{
    e.preventDefault();
    try {
        let result=await axios.post(`http://localhost:7000/update/${update}`,{
      description:val
        },
      {
        headers:{'Content-Type':'application/json'},
        withCredentials:true
      })
    await gettodo()
    navigate('/')
    toast.success("todo has been updated",{
      autoClose:true,
      theme:'colored'
    })
    } catch (error) {
      
    }
  }
  return (
    <div className='w-[100%] h-[100vh] flex justify-center items-center'>
            <form  action="" onSubmit={handleUpdate} className='w-[40%] h-[100px]  flex justify-center items-center shadow-md shadow-gray-300 p-[20px]'>
                    <input name='description' value={val} onChange={(e)=>setVal(e.target.value)} className='w-[80%] bg-transparent h-[40px] border-2 border-[#49f349] px-[10px] outline-[#49f349] text-black placeholder:text-black' type="text" placeholder='enter todo...' />
                    <button   className='bg-[#49f349] w-[20%] h-[40px] text-white text-[18px] font-semibold cursor-pointer' type='submit'>update</button>
                </form>
    </div>
  )
}

export default Update