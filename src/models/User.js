import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },           // ✅ changed from 'username' to 'name'
    email: { type: String, required: true, unique: true }, // ✅ added email
    password: { type: String, required: true },       // hashed password
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true } // ✅ track createdAt & updatedAt
);

export default mongoose.model("User", userSchema);
