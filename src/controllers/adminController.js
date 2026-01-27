import Admin from "../models/Admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerAdmin = async (req, res) => {
const { email, password } = req.body;


const hashed = await bcrypt.hash(password, 10);
const admin = await Admin.create({ email, password: hashed });


res.json({ success: true, admin });
};


export const loginAdmin = async (req, res) => {
const { email, password } = req.body;


const admin = await Admin.findOne({ email });
if (!admin) return res.status(400).json({ message: "Admin not found" });


const isMatch = await bcrypt.compare(password, admin.password);
if (!isMatch) return res.status(400).json({ message: "Wrong password" });


const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1d" });


res.json({ success: true, token });
};