/** @format */

import Product from "../../models/product.mjs";
import { productValidator } from "../../config/validators/product.mjs";
import asyncHandler from "../../middlewares/asyncHandler.mjs";
import uploadSingleImage from "../../middlewares/uploadImages.mjs";

const createProduct = asyncHandler(async (req, res) => {
  try {
    await productValidator.validate(req.body);
    const product = new Product({ ...req.body });
    await product.save();
    res.json({
      message: "Product successfully created",
      success: true,
      product: { ...product._doc },
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    await productValidator.validate(req.body);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    await product.save();

    res.json({
      message: "Product successfully updated",
      success: true,
      product: { ...product._doc },
    });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    // const product = await Product.findByIdAndDelete(req.params.id);
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.json({
        message: "Product was not found",
        success: false,
      });
    }

    res.json({
      message: "Product successfully deleted",
      success: true,
      product: { ...product._doc },
    });
  } catch (error) {
    res.status(500).json({ message: error.message, success: false });
  }
});

const getProducts = asyncHandler(async (req, res) => {
  try {
    let { page, limit, keyword } = req.query;

    const queryPage = Number(page) && Number(page) > 0 ? Number(page) : 1;

    const queryLimit =
      Number(limit) && Number(limit) > 0 && Number(limit) < 20
        ? Number(limit)
        : 10;

    const skip = (queryPage - 1) * queryLimit;

    const queryKeyword = keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
          isActive: true,
        }
      : {
          isActive: true,
        };

    const count = await Product.countDocuments({ ...queryKeyword });
    const products = await Product.find({ ...queryKeyword })
      // .populate("category")
      .skip(skip)
      .limit(queryLimit);

    res.json({
      products,
      page: queryPage,
      pages: Math.ceil(count / queryLimit),
      hasMore: Math.ceil(count / queryLimit) - queryPage > 0 ? true : false,
      message: "successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    let { page, limit, keyword } = req.query;

    const queryPage = Number(page) && Number(page) > 0 ? Number(page) : 1;

    const queryLimit =
      Number(limit) && Number(limit) > 0 && Number(limit) < 20
        ? Number(limit)
        : 10;

    const skip = (queryPage - 1) * queryLimit;

    const queryKeyword = keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...queryKeyword });
    const products = await Product.find({ ...queryKeyword })
      .populate("category")
      .skip(skip)
      .limit(queryLimit);

    res.json({
      products,
      page: queryPage,
      pages: Math.ceil(count / queryLimit),
      hasMore: Math.ceil(count / queryLimit) > 1 ? true : false,
      message: "successful",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message, success: false });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (product) {
      return res.json({
        message: "Product successfully",
        success: true,
        product: { ...product._doc },
      });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message, success: false });
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.id.toString()
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }

      const review = {
        name: req.customer.name,
        rating: Number(rating),
        comment,
        user: req.customer._id,
      };

      product.reviews.push(review);

      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({
        message: "Review added successfully",
        success: true,
      });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
});

const getTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ rating: -1 })
      .limit(10);
    res.json({
      message: "successfully",
      success: true,
      products: [...products],
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      product: [],
    });
  }
});

const getNewProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .sort({ _id: -1 })
      .limit(10);
    res.json({
      message: "Product successfully",
      success: true,
      products: [...products],
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      product: [],
    });
  }
});

const getFilteredProducts = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.category = checked;
    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    args.isActive = true;

    const { page, limit } = req.query;

    const queryPage = Number(page) && Number(page) > 0 ? Number(page) : 1;

    const queryLimit =
      Number(limit) && Number(limit) > 0 && Number(limit) < 20
        ? Number(limit)
        : 10;

    const skip = (queryPage - 1) * queryLimit;

    const count = await Product.countDocuments({ ...args });

    const products = await Product.find(args).skip(skip).limit(queryLimit);

    res.json({
      message: "Product successfully",
      success: true,
      products: [...products],
      page: queryPage,
      pages: Math.ceil(count / queryLimit),
      hasMore: Math.ceil(count / queryLimit) - queryPage > 0 ? true : false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
});

const addProductImages = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    uploadSingleImage(req, res, async (err) => {
      if (err) {
        res.status(400).send({
          message: "Failed to upload file. File must be image/jpg or jpeg",
          success: false,
        });
      } else if (req.file) {
        const imageLocation = `/${req.file.path}`;
        const imageUrl = `${req.protocol}://${req.get(
          "host"
        )}${imageLocation.replace("/dist", "")}`;
        product.images.push(imageUrl);

        await product.save();

        res.status(200).send({
          message: "Image uploaded successfully",
          success: true,
          image: imageLocation,
          product: { ...product._doc },
        });
      } else {
        res
          .status(400)
          .send({ message: "No file was provided", success: false });
      }
    });
  } catch (error) {
    res.status(400).send({ message: err.message, success: false });
  }
});

const addProductThumbnail = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.productId });
    uploadSingleImage(req, res, async (err) => {
      if (err) {
        res.status(400).send({
          message: "Failed to upload file. File must be image",
          success: false,
        });
      } else if (req.file) {
        const imageLocation = `/${req.file.path}`;
        const imageUrl = `${req.protocol}://${req.get(
          "host"
        )}${imageLocation.replace("/dist", "")}}`;

        product.thumbnail = imageUrl;

        await product.save();

        res.status(200).send({
          message: "Image uploaded successfully",
          success: true,
          thumbnail: imageLocation,
          product: { ...product._doc },
        });
      } else {
        res
          .status(400)
          .send({ message: "No file was provided", success: false });
      }
    });
  } catch (error) {
    res.status(400).send({ message: err.message, success: false });
  }
});

export {
  createProduct,
  getTopProducts,
  updateProduct,
  removeProduct,
  getProducts,
  getProductById,
  addProductReview,
  getNewProducts,
  getFilteredProducts,
  addProductImages,
  getAllProducts,
  addProductThumbnail,
};
