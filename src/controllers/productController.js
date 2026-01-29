import Product from "../models/Product.js";

/* ---------------- GET ALL PRODUCTS (public) ---------------- */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().lean(); // lean() for plain JS objects
    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* ---------------- ADD PRODUCT (admin) ---------------- */
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
};

/* ---------------- UPDATE PRODUCT (admin) ---------------- */
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // ✅ runValidators ensures schema validation
    );

    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, updated });
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).json({ message: "Failed to update product" });
  }
};

/* ---------------- DELETE PRODUCT (admin) ---------------- */
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
