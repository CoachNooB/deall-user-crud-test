import mongoose from "mongoose";
import { Config } from "../config";

export const dbConnect = async (config: Config) => {
    try {
        const conn = await mongoose.connect(config.mongoUri);
        console.log(`Connected to Database ${conn.connection.host}.`)
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}