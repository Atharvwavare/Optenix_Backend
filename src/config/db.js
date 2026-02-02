import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.Mongo_atlas_URL) throw new Error("MONGO_URI not defined");

    await mongoose.connect(process.env.Mongo_atlas_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error(" MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

export default connectDB;
