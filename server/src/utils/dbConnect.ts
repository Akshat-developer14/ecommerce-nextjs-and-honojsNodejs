import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import dotenv from 'dotenv';
dotenv.config();


export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`).then((data: any) => {
            console.log(`Database connected successfully ${data.connection.host}`);
        });
    } catch (error: any) {
        console.error("Database connection error: ", error.message);
        setTimeout(connectDB, 5000);
    }
}