// src/controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/* ---------------- REGISTER USER ---------------- */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // ✅ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, and password are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user", // default role = user
    });

    // ✅ Return only necessary fields to frontend
    const { password: _, ...userData } = user.toObject();
    res.status(201).json({ message: "User registered", user: userData });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/* ---------------- LOGIN USER ---------------- */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Sign JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // ✅ Return only necessary fields
    const { password: _, ...userData } = user.toObject();

    res.status(200).json({ message: "Login successful", token, user: userData });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
