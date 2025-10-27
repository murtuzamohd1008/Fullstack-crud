import express from 'express'

import { login, logout, signup ,getCurrentUser} from '../controler/user.js';
import { isAuth } from '../middleware/isAuth.js';


 export const userRouter=express.Router();

userRouter.post('/signup',signup);
userRouter.post('/login',login);
userRouter.get('/currentuser',getCurrentUser)
userRouter.get('/logout',logout)