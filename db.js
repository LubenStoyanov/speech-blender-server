import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
export default () => mongoose.connect(process.env.MONGODB_URI);
