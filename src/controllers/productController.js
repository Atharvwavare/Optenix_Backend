import Product from "../models/Product.js";


// Get all products (public)
export const getProducts = async (req, res) => {
const products = await Product.find();
res.json(products);
};


// Add product (admin)
export const addProduct = async (req, res) => {
const product = await Product.create(req.body);
res.json({ success: true, product });
};


// Update product (admin)
export const updateProduct = async (req, res) => {
const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
res.json({ success: true, updated });
};


// Delete product (admin)
export const deleteProduct = async (req, res) => {
await Product.findByIdAndDelete(req.params.id);
res.json({ success: true, message: "Product deleted" });
};