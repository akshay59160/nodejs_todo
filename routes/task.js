import  Express  from "express";
import { deletetask, getMytask, newTask, updateTask } from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router=Express.Router();

router.post("/new",isAuthenticated,newTask);
router.get("/my",isAuthenticated,getMytask);

router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deletetask);


export default router;