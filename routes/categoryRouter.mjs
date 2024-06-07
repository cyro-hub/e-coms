/** @format */

import { Router, json } from "express";
import {
  createCategory,
  updateCategory,
  getCategories,
  addCategoryThumbnail,
} from "../Controllers/categoryController.mjs";
import multer from "multer";
import uploadImage from "../middlewares/firebase.mjs";

const upload = multer({ storage: multer.memoryStorage() });

const categoryRouter = Router();
categoryRouter.use(json());

categoryRouter.route("/").post(createCategory).get(getCategories);

categoryRouter
  .route("/:id")
  .put(updateCategory)
  .post(upload.single("image"), uploadImage, addCategoryThumbnail);

export default categoryRouter;
