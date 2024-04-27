/** @format */

import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
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
    },
  },
  { timestamps: true }
);

const Category = mongoose.model("Categories", categorySchema);

export default Category;
