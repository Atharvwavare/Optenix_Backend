import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    price: { type: Number, required: true, min: 0 },
    offer: { type: Number, default: 0 }, // percentage off
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
