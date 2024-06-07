/** @format */

import { Router, json } from "express";
import {
  createBrand,
  updateBrand,
  getBrands,
  addBrandThumbnail,
} from "../Controllers/brandController.mjs";
import uploadImage from "../middlewares/firebase.mjs";

import multer from "multer";
const upload = multer({ storage: multer.memoryStorage() });

const brandRouter = Router();
brandRouter.use(json());

brandRouter.route("/").post(createBrand).get(getBrands);

brandRouter
  .route("/:id")
  .put(updateBrand)
  .post(upload.single("image"), uploadImage, addBrandThumbnail);

// brandRouter.route("/:id")

export default brandRouter;
