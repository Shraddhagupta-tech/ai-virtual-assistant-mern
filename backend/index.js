import express from "express";
import authRouter from "./router/authRouter.js";
import cors from "cors";
import connectDb from "./config/connectDb.js";
import userRouter from "./router/userRouter.js";
import cookieParser from "cookie-parser";
import groqResponse from "./groq.js";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
let port = process.env.PORT || 4000;
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  connectDb();
  console.log("server connected");
});

app.get("/", async(req, res) => {
  let prompt=req.query.prompt
  let data=await groqResponse(prompt)
  res.json(data)
  
});