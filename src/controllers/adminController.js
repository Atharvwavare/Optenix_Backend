import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register a new admin
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // ✅ Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // Hash password
    const hashed = await bcrypt.hash(password, 10);

    // Create admin
    const admin = await Admin.create({ email, password: hashed });

    res.status(201).json({ success: true, admin });
  } catch (err) {
    console.error("Error registering admin:", err);
    res.status(500).json({ message: "Server error during admin registration" });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong password" });

    // ✅ Include email in token payload (optional) and sign JWT
    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({ success: true, token });
  } catch (err) {
    console.error("Error logging in admin:", err);
    res.status(500).json({ message: "Server error during admin login" });
  }
};
