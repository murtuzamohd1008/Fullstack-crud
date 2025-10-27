import express from 'express'
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import { connectDB } from './db/connectdb.js';
import { userRouter } from './Router/user.js';
import cookieParser from 'cookie-parser';
import { todoRouter } from './Router/todo.js';
import cors from 'cors'
const app=express();

dotenv.config()
const PORT=process.env.PORT||4000;
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
app.use(userRouter);
app.use(todoRouter)


app.listen(PORT,()=>{
    console.log(`server connected at port ${PORT}`);
     connectDB()
})
