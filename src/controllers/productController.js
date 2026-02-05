import Product from "../models/Product.js";

/* ---------------- GET ALL PRODUCTS (PUBLIC SHOP) ---------------- */
export const getProducts = async (req, res) => {
  try {
    // 👇 Only show active & published products in SHOP
    const products = await Product.find({
      isActive: true,
      status: "published",
    }).lean();

    res.status(200).json(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products" });
  }
};

/* ---------------- GET SINGLE PRODUCT BY ID (PUBLIC) ---------------- */
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      isActive: true,
      status: "published",
    }).lean();

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).json({ message: "Failed to fetch product" });
  }
};

/* ---------------- ADD PRODUCT (ADMIN) ---------------- */
export const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,

      // 👇 enforce correct defaults
      isActive: true,
      status: "published",
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    console.error("Error adding product:", err);
    res.status(500).json({ message: "Failed to add product" });
  }
};

/* ---------------- UPDATE PRODUCT (ADMIN) ---------------- */
export const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
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

/* ---------------- DELETE PRODUCT (ADMIN) ---------------- */
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).json({ message: "Failed to delete product" });
  }
};
