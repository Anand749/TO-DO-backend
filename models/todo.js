import mongoose from "mongoose";

const todo=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
});

export default mongoose.model("Todo",todo);