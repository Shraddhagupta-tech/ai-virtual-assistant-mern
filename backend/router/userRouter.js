import express from "express";
import { askToAssistant, getCurrUser, updateAssistant } from "../controller/user.controller.js";
import { isAuth } from "../middleware/isAuth.js";


const userRouter = express.Router();

userRouter.get("/current",isAuth,getCurrUser);
userRouter.post("/update",isAuth,updateAssistant)
userRouter.post("/asktoassistant",isAuth,askToAssistant);
export default userRouter;