/** @format */

import formidable from "express-formidable";
import authenticate from "../middlewares/verifyToken.mjs";
import { Router } from "express";
import {
  createProduct,
  updateProduct,
  removeProduct,
  getProducts,
  getProductById,
  addProductReview,
  getTopProducts,
  getNewProducts,
  getFilteredProducts,
  addProductImages,
  getAllProducts,
  addProductThumbnail,
} from "../Controllers/productController.mjs";

import multer from "multer";
import uploadImage from "../middlewares/firebase.mjs";

const upload = multer({ storage: multer.memoryStorage() });

const productRoutes = Router();

productRoutes
  .route("/")
  .post(
    //formidable(),
    createProduct
  )
  .get(getProducts);

productRoutes.get("/top", getTopProducts);
productRoutes.get("/new", getNewProducts);
productRoutes.post("/filter", getFilteredProducts);
productRoutes.get("/all", getAllProducts);
productRoutes.post(
  "/upload/:id",
  upload.single("image"),
  uploadImage,
  addProductImages
);
productRoutes.post(
  "/thumbnail/:id",
  upload.single("image"),
  uploadImage,
  addProductThumbnail
);
productRoutes
  .route("/:id")
  .post(authenticate, addProductReview) //autheticated
  .put(updateProduct)
  .delete(formidable(), removeProduct)
  .get(getProductById);

export default productRoutes;
