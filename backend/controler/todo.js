
import { Todo } from "../model/todo.js";

export const createTodo = async (req, res) => {
    console.log("helllo")
    let description = req.body.description;
    if (!description) {
        return res.status(401).json({
            success: false,
            message: "enter your todo"
        })
    }
    const existdescription = await Todo.findOne({ description });
    if (existdescription) {
        return res.status(400).json({
            success: false,
            message: "add some new task"
        })
    }

    let newDescription = await Todo.create({
        description
    })
    console.log(newDescription)
    return res.status(200).json({
        success: true,
        message: "todo created successfully",
    })
}

export const getTodo=async (req,res)=>{

    try {
        const alltodo=await Todo.find();
        if(!alltodo){
            return res.status(400).json({
                success:false,
                message:"there no todo written",
                alltodo:alltodo
            })
        }
        return res.status(200).json({
            success:true,
            todo:alltodo
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }
}

export const deleteTodo = async (req, res) => {
    try {
        let { id } = req.params;
        const deleteTodo = await Todo.findByIdAndDelete(id);
        return res.status(200).json({
            success:true,
            message:"todo has deleted successfully"
        })
    } catch (error) {
         console.log(error)
         return res.json({
            success:false,
            message:"server error"
         })
    }
}

export const updateTodo=async (req,res)=>{
    try {
        const {id}=req.params;
        const {description}=req.body;
        const updateDescription=await Todo.updateOne({_id:id},{description})
        return res.status(200).json({
            success:true,
            message:"description updated successfully",
            updateDescription
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"server error"
        })
    }

}