/** @format */

import { Router, json } from "express";
import {
  createCategory,
  updateCategory,
  getCategories,
  addCategoryImage,
} from "../../Controllers/category/categoryController.mjs";

const categoryRouter = Router();
categoryRouter.use(json());

categoryRouter
  .route("/")
  .post(createCategory)
  .put(updateCategory)
  .get(getCategories);

categoryRouter.post("/upload/:categoryId", addCategoryImage);

export default categoryRouter;
