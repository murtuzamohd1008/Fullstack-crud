import express from "express";
import { createTodo,deleteTodo, getTodo, updateTodo } from "../controler/todo.js";
import { isAuth } from "../middleware/isAuth.js";

export const todoRouter=express.Router();

todoRouter.post('/createtodo',isAuth,createTodo);
todoRouter.get('/gettodo',getTodo)
todoRouter.delete('/deletetodo/:id',isAuth,deleteTodo);
todoRouter.post('/update/:id',isAuth,updateTodo);