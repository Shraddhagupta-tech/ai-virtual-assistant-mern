import connectDb from "../config/connectDb.js";
import genToken from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already registered!" });
    }
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password should be atleast 6 characters long!" });
    }
    const hashedPassword = await bcrypt.hash(password, 6);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSight: "strict",
      maxAge: 7 * 24 * 60 * 60 * 60,
    });
    return res.status(201).json({
      message: "User registered successfully.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(` register error : ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  console.log("1. Login API called");
  console.log("2. Request body:", req.body);
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not found!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect password!",
      });
    }
    const token = await genToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful.",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(`login error ; ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearcookie("token");
    return res.status(200).json({ message: "logout was successful" });
  } catch (error) {
    console.log(`logout error : ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};
