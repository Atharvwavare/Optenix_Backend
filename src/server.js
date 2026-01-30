// src/server.js
import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

const app = express();

// Middleware FIRST
app.use(cors());
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
