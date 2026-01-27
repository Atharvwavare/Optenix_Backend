import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
name: { type: String, required: true },
image: { type: String, required: true },
images: [{ type: String }],
price: { type: Number, required: true },
originalPrice: { type: Number },
rating: { type: Number, default: 0 },
discount: { type: String },
description: { type: String },
specifications: [{ type: String }],
}, { timestamps: true });


export default mongoose.model("Product", productSchema);