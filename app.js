import express from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js"
import cors from "cors";
export const app =express();

import { config } from "dotenv";
config({
    path:"./data/config.env",
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    method:["GET","POST","PUT","DELETE"],
    credential:true
}));
app.use("/user",userRouter);
app.use("/task",taskRouter);






