// src/server.js

// .env file import
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middleware FIRST
app.use(cors({
  origin:[
    "https://www.optenix.in",
    "https://optenix.in"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials:true
}));
app.options("*", cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);


// Test route
app.get("/", (req, res) => {
  res.send("Backend Running...");
});

export default app;
