import express from "express";
import {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { adminAuth } from "../middleware/adminAuth.js";

const router = express.Router();

/* ================= PUBLIC SHOP ================= */
router.get("/", getProducts);
router.get("/:id", getProductById); 

/* ================= ADMIN ================= */
router.post("/admin", adminAuth, addProduct);
router.put("/admin/:id", adminAuth, updateProduct);
router.delete("/admin/:id", adminAuth, deleteProduct);

export default router;
