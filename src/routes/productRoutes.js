import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { adminAuth } from "../middleware/AdminAuth.js";

const router = express.Router();

/* ================= PUBLIC SHOP ================= */
router.get("/", getProducts);

/* ================= ADMIN ================= */
router.post("/admin", adminAuth, addProduct);
router.put("/admin/:id", adminAuth, updateProduct);
router.delete("/admin/:id", adminAuth, deleteProduct);

export default router;
