import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },       // frontend expects 'name'
    image: { type: String, default: "" },                      // main image
    images: { type: [String], default: [] },                   // optional multiple images
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    discount: { type: String, default: "" },
    description: { type: String, default: "" },
    specifications: { type: [String], default: [] },
    isActive: { type: Boolean, default: true },
    status: { type: String, default: "published" }
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
