import express from "express";
import { getCurrUser, updateAssistant } from "../controller/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";


const userRouter = express.Router();

userRouter.get("/current",isAuth,getCurrUser);
userRouter.post("/update",isAuth,updateAssistant)
export default userRouter;