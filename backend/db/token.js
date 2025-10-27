 import jwt from 'jsonwebtoken'
export const generateToken=async (id)=>{
   const token=await jwt.sign({userId:id},process.env.SECRET_KEY,{expiresIn:'3d'});
   return token
}