import User from "../models/userModel.js";
import jwt from "jsonwebtoken"

const genToken = (UserId) => {
  try {
    const token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'}
    )
  } catch (error) {
    console.log(error);
    
  }
};
export default genToken