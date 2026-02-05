import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  getProductById, // 👈 ADD THIS
} from "../controllers/productController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

/* ================= PUBLIC SHOP ================= */
router.get("/", getProducts);
router.get("/:id", getProductById); // 👈 ADD THIS

/* ================= ADMIN ================= */
router.post("/admin", adminAuth, addProduct);
router.put("/admin/:id", adminAuth, updateProduct);
router.delete("/admin/:id", adminAuth, deleteProduct);

export default router;
