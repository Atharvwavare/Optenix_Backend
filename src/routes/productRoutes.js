import express from "express";
import { getProducts, addProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { adminAuth } from "../middleware/AdminAuth.js";


const router = express.Router();


router.get("/", getProducts);
router.post("/", adminAuth, addProduct);
router.put("/:id", adminAuth, updateProduct);
router.delete("/:id", adminAuth, deleteProduct);


export default router;