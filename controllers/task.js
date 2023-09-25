import { Task}  from "../models/task.js";

export const newTask=async (req,res,next)=>{
    const {title,description}=req.body;
    await Task.create({
        title,
        description,
        user:req.user
    })
res.json({
    success:true,
    message:"task added succesfully"
})
}

export const getMytask=async(req,res,next)=>{
const userid=req.user._id;
const tasks=await Task.find({user:userid});
res.json({
    success:true,
    tasks,
})
}





export const updateTask=async (req,res,next)=>{
    const {id}=req.params;

    const task =await Task.findById(id);
    
    if(!task)
    return res.json({
success:true,
message:"Invalid id"
})
    task.isCompleted=!task.isCompleted;
   await task.save()
 
res.json({
    success:true,
    message:"task updated"
   
})
}

export const deletetask=async(req,res,next)=>{

    const task =await Task.findById(req.params.id);

    if(!task)
    return res.json({
success:true,
message:"Invalid id"
})

    
   await task.deleteOne();

res.json({
    success:true,
    message:"deleted"
    
})
}