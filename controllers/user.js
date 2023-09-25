import { User}  from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/fatures.js";

// import jwt from "jsonwebtoken";



export const getAllUsers=async (req,res)=>{
    const user= await User.find({});
  //  const keyword=req.query.keyword;
  //   console.log(keyword);
  
  //   console.log(req.query);
      res.json({
          success:true,
          user,
      });
  };

  export const register= async (req,res)=>{

    const {name,email,password}=req.body;
    let user= await User.findOne({email});

    if(user)
    return res.status(404).json({
     success:false,
     message:"user already exit"
    })

    const hashedpassword= await bcrypt.hash(password,10);
    user= await User.create({
          name,
          email,
          password:hashedpassword,
      });
      sendCookie(user,res,"register succesfully");
     
   };

   export const login=async(req,res)=>{
    const {email,password}=req.body;
    const user= await User.findOne({email}).select("+password");

     if(!user)
    return res.status(404).json({
     success:false,
     message:"user dosen't exit"
    })
    const isMatch = await bcrypt.compare(password,user.password)
     
    if(!isMatch)
    return res.status(404).json({
     success:false,
     message:"password Invalid"
    });
    sendCookie(user,res,`welcom back,${user.name}`)
   }
   export const special=async(req,res)=>{
    res.json({
        success:true,
        message:"special",

    });
 };
 export const getMyProfile = async(req,res)=>{
    
    res.json({
        success:true,
        user:req.user,

    });
 }

 export const logout = async (req,res)=>{
    res.cookie("token","",{expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development" ? "lax" :"none",
        secure:process.env.NODE_ENV==="Development" ? false :true
    })
    .json({
        success:true,
        message:"logout succesfully"

    })

 }


   export const getUserDetail=async(req,res)=>{
    const {id}=req.params;
    console.log(req.params);
    console.log(id);
    const user=await User.findById(id);

    res.json({
        success:true,
        user,

    })
 }
 export const updateUser=async(req,res)=>{
    const {id}=req.params;
  
    const user=await User.findById(id);

    res.json({
        success:true,
        message:"update user",

    })
 }
 export const deleteUser=async(req,res)=>{
    const {id}=req.params;
   
    const user=await User.findById(id);
    // await user.remove();

    res.json({
        success:true,
        message:"deleted",

    })
 }