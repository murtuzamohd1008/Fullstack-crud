

import jwt from 'jsonwebtoken'
export const isAuth=async (req,res,next)=>{
    const token=req.cookies.token;
   if(!token){
    return res.status(401).json({
        success:false,
        message:"user is not authorize"
    })
   }
    const isverify=await jwt.verify(token,process.env.SECRET_KEY);
       if(!isverify){
        return res.status(401).json({
            success:true,
            message:"invalid token"
        })
       }
    req.id=isverify.userId
    next()
}