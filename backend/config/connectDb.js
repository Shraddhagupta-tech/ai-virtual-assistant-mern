import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongodb connected : ${conn.connection.host}`);
  } catch (error) {
    console.log("Mongodb connection failed");
    console.log(error);
    process.exit(1);
  }
};
export default connectDb;
