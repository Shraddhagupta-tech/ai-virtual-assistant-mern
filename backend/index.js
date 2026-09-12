import express from "express";
import authRouter from "./routes/authRouter.js";
import cors from "cors";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
port = process.env.PORT || 4000;
app.use(express.json());
app.use("/api/auth", authRouter);

app.listen(port, () => {
  connectDb();
  console.log("server connected");
});
