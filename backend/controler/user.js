import { generateToken } from "../db/token.js";
import { User } from "../model/user.js";
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
  try {
     const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json(
      {
        success: false,
        message: "all entries required",
      }
    )
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "user already exist"
    })
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    name,
    email,
    password: hashPassword
  })
  const token = await generateToken(newUser._id);
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000
  })
  return res.status(200).json({
    success: true,
    user: newUser,
    message: "user account created successfully"
  })
  } catch (error) {
      console.log(error);
      return res.status(500).json({
        success:false,
        message:"server error"
      })
  }
 
}

export const login = async (req, res) => {
  try {
    console.log("hello")
     const { email, password } = req.body
  if (!email || !password) {
    return res.status.json({
      success: false,
      message: "all fields required"
    })
  }
  const existUser = await User.findOne({ email });
  if (!existUser) {
    return res.status(400).json({
      success: false,
      message: "user does not exist"

    })
  }
  const ispassword = await bcrypt.compare(password, existUser.password);
  if (!ispassword) {
    return res.status(401).json({
      success: false,
      message: "password incorrect",

    })
  }

  const token = await generateToken(existUser._id);

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 3 * 24 * 60 * 60 * 1000
  })
  return res.status(200).json({
    success: true,
    message: "user logged in successfully",
      user:existUser
  })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"server error"
    })
  }
  
}

export const getCurrentUser=async(req,res)=>{
  try {
    let token=req.cookies.token;
    return res.status(200).json({
      success:true,
      token:token
    })
  } catch (error) {
    console.log(error)
    return res.status(500).jason({
      success:false,
      message:'server error',
      error:error
    })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie("token")
    return res.status(200).json(
      {
        success: true,
        message: "user logged out successfully",
       
      }
    )
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "server error"
    })
  }
}