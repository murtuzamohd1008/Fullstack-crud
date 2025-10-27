import mongoose from "mongoose";

const todoSchema=mongoose.Schema({
   description:{
    type:String,
    required:true
   }
})

export const Todo=mongoose.model("Todo",todoSchema);