import express from "express";
import Product from "../models/Product.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

/* GET PRODUCTS PUBLIC */
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* CREATE PRODUCT ADMIN ONLY */
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { title, price } = req.body;
    if (!title || price === undefined)
      return res.status(400).json({ message: "Title & price required" });

    const product = await Product.create({ title, price });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* DELETE PRODUCT ADMIN ONLY */
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
