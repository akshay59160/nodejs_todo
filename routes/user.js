import  Express  from "express";

import {deleteUser, getAllUsers, getUserDetail, login, register, special, updateUser,getMyProfile, logout, } from "../controllers/user.js";

const router=Express.Router();
import { isAuthenticated } from "../middlewares/auth.js";


router.get("/",(req,res)=> {
    res.send("nice working");
});
router.get("/all",getAllUsers); 

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

 router.get("/me", isAuthenticated , getMyProfile);
  router.get("/userid/special",special);
 router.get("/userid/:id",getUserDetail);
 router.put("/userid/:id",updateUser);
 router.delete("/userid/:id",deleteUser);
export default router;