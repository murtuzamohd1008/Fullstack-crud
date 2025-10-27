import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
export const contextdata=createContext()
export const ContextApi = ({children}) => {
const [currentuser,setCurrentUser]=useState('');
 const [todo,setTodo]=useState('');
 const [alltodo,setAllTodo]=useState([]);
 const [update,setUpdate]=useState('')
 
// const alltodo=async()=>{
//     try {
//         let result=await axios.get('http://localhost:7000/')
//     } catch (error) {
        
//     }
// }
const gettodo=async()=>{
    try {
        let result=await axios.get('http://localhost:7000/gettodo',{withCredentials:true})
      
      setAllTodo(result.data.todo)
    } catch (error) {
      console.log(error)
    }
}



const handleCurrent=async()=>{
  try {
      let result=await axios.get('http://localhost:7000/currentuser',{
        withCredentials:true
      })
       setCurrentUser(result.data.token)
  }catch (error) {
    console.log(error);
  }
}

useEffect(()=>{
    handleCurrent();
},[currentuser])
    const value={
           currentuser,
           handleCurrent,
           todo,
           setTodo,
           gettodo,
           alltodo,
           update,
           setUpdate
          
    }
  return (
    <div>
      <contextdata.Provider value={value}>
        {children}
      </contextdata.Provider>
    </div>
  )
}

export default ContextApi