import mongoose from "mongoose";


const Schema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
         
     },
    email:{
       type:String,
       required:true,
        unique:true,
    },
    password:{
       type: String,
       required:true,
       select:false,
    },
    createAt:{
        type:Date,
        required:true,
        default:Date.now,
    }
});
export const User=mongoose.model("User",Schema);