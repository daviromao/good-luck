import env from "./env";
import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export const connectDB = async () => {
  await mongoose.connect(env.MONGO_URI);
};
