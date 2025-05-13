import mongoose from "mongoose";
import { MONGO_URI } from "../config/env";

const connectDB = async () => {
    try {
        console.log("\n MongoDB Connection in Progress...")
        const connectionInstance = await mongoose.connect(MONGO_URI);
        console.log(`\n MongoDB Connected !! DB host: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log("MONGODB CONNECTION FAILED");
        process.exit(1)
    }
}

export default connectDB
