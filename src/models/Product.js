import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    images: { type: [String], default: [] }, // ✅ Added multiple images support
    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },
    rating: { type: Number, default: 0 },
    discount: { type: String, default: "" },
    description: { type: String, default: "" }, // ✅ Optional description
    specifications: { type: [String], default: [] }, // ✅ Optional specifications
  },
  { timestamps: true } // ✅ Track createdAt & updatedAt
);

export default mongoose.model("Product", ProductSchema);
