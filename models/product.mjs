/** @format */

import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    images: { type: Array, default: [] },
    quantity: { type: Number, required: true },
    category: { type: ObjectId, ref: "Category", required: true },
    brand: { type: ObjectId, ref: "Brand", required: true },
    description: { type: String, required: true },
    reviews: [reviewSchema],
    rating: { type: Number, required: true, default: 0 },
    numReviews: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    isActive: { type: Boolean, default: true },
    thumbnail: { type: String },
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);
export default Product;
