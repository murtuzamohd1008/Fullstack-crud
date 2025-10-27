import axios from 'axios';
import React, { useContext, useState } from 'react'
import { contextdata } from '../context/ContextApi';
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Home = () => {
   const {todo,setTodo,alltodo,gettodo,update,setUpdate}=useContext(contextdata)
   const navigate=useNavigate()
   //console.log("todos",alltodo)
  const handleSubmit=async (e)=>{
      e.preventDefault();
      try {
         let result=await axios.post('http://localhost:7000/createtodo',{
            description:todo
         },
         {
            headers:{'Content-Type':'application/json'},
            withCredentials:true
         }
        )
       await gettodo()
        setTodo('');
       toast.success('todo added successfully',{
        autoClose:true,
        theme:'colored'
       })
      
       
      } catch (error) {
         toast.error('todo not added yed',{
        autoClose:true,
        theme:'colored'
       })
        console.log(error)
      }
  }
  const hsndleDelete=async(id)=>{
    try {
         let result=await axios.delete(`http://localhost:7000/deletetodo/${id}`,{withCredentials:true})
         console.log(result)
         gettodo()
         toast.success("todo has been deleted",{
            theme:'colored',
            autoClose:true
         })
    } catch (error) {
        console.log(error)
    }
  }

 
    return (
        <div className='w-[100%] h-[100vh] flex justify-center overflow-hidden'>
            <div className=' w-[100%] md:w-[40%] min-h-[200px] max-h-[500px]   mt-[100px] md:mt-[130px] overflow-hidden  shadow-lg shadow-gray-400 p-[20px] rounded-lg'>
                <form onSubmit={handleSubmit} action="" className='w-[100%] flex justify-center items-center  rounded-lg shadow-gray-300'>
                    <input name='description' value={todo} onChange={(e)=>setTodo(e.target.value)} className='w-[80%] bg-white  h-[45px] border-[1px] border-gray-200 px-[10px] rounded-tl-lg rounded-bl-lg outline-1 outline-gray-200 text-black placeholder:text-black' type="text" placeholder='enter todo...' />
                    <button  className='bg-[#49f349] rounded-tr-lg rounded-br-lg w-[20%] h-[48px] text-white text-[18px] font-semibold cursor-pointer' type='submit'>Add</button>
                </form>
                {
                    alltodo.length===0?<h1 className='text-center font-semibold text-red-500 mt-[50px]  text-[25px] '>There is no todo added yet</h1>:
                
                <div  id='todo' className='w-[100%] min-h-[200px]  max-h-[500px] overflow-auto flex  flex-col gap-[20px] mt-[40px]'>
                  {
                    alltodo.map((todo)=><div className='w-[100%] pl-[14px] rounded-lg  mt-[20px] shadow-lg shadow-gray-300  py-[10px]  flex'>
                        <p className='w-[80%] text-[16px] font-semibold'>{todo.description}</p>
                        <div className=' flex gap-[10px]'>
                            <button onClick={()=>{navigate('/update');
                                setUpdate(todo._id)
                            }} className=' '><MdModeEdit size={26} className='text-green-500 cursor-pointer' /></button>
                            <button onClick={()=>hsndleDelete(todo._id)}>< MdDelete size={26} className='text-red-500 cursor-pointer' /></button>
                        </div>
                    </div>)
                  }
                </div>}
            </div>

        </div>
    )
}

export default Home