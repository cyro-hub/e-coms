/** @format */

import mongoose, { Schema } from "mongoose";

const brandSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 32,
      unique: true,
    },
    thumbnail: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Brand", brandSchema);

export default Category;
