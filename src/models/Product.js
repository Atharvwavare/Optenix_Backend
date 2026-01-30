import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },

    image: { type: String, default: "" },
    images: { type: [String], default: [] }, // multiple images

    price: { type: Number, required: true },
    originalPrice: { type: Number, default: 0 },

    rating: { type: Number, default: 0 },
    discount: { type: String, default: "" },

    description: { type: String, default: "" },
    specifications: { type: [String], default: [] },

    /* ================= IMPORTANT FIX ================= */

    // Controls visibility in SHOP
    isActive: {
      type: Boolean,
      default: true, // 👈 VERY IMPORTANT
    },

    // Product publish state
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published", // 👈 VERY IMPORTANT
    },

    /* ================================================= */
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
