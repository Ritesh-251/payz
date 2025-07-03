import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

function connectDB(){ return mongoose.connect(`${process.env.MONGODB_URI}`)};

export default connectDB;


