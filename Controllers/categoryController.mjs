/** @format */

import Category from "../models/category.mjs";
import asyncHandler from "../middlewares/asyncHandler.mjs";
import { categoryValidator } from "../config/validators/category.mjs";
// import uploadSingleImage from "../middlewares/uploadImages.mjs";

const createCategory = asyncHandler(async (req, res) => {
  await categoryValidator.validate(req.body);

  const { name } = req.body;

  try {
    const category = new Category({ name: name });

    await category.save();

    res.status(201).json({
      message: "Category successfully created",
      success: true,
      category: { ...category._doc },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate Category make sure no same category exist",
        success: false,
        category: null,
      });
    }
    return res.status(400).json({
      message: "Failed to add category",
      success: false,
      category: null,
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  await categoryValidator.validate(req.body);

  const { name } = req.body;
  try {
    const category = await Category.findOne({ _id: req.params.id });

    if (!category) {
      throw new Error("Category not found");
    }

    category.name = name || category.name;

    const updatedCategory = await category.save();

    res.status(201).json({
      message: "Category successfully updated",
      success: true,
      category: { name: updatedCategory.name },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
      success: false,
      category: null,
    });
  }
});

const getCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json([...categories]);
  } catch (error) {
    throw new Error(error.message);
  }
});

const addCategoryThumbnail = asyncHandler(async (req, res) => {
  try {
    console.log(req.params);
    const category = await Category.findOne({ _id: req.params.id });

    // uploadSingleImage(req, res, async (err) => {

    //   if (err) {
    //     res.status(400).send({
    //       message: "Failed to upload file. File must be image/jpg or jpeg",
    //       success: false,
    //     });
    //   } else if (req.file) {
    //     const imageLocation = `/${req.file.path}`;
    //     const imageUrl = `${req.protocol}://${req.get(
    //       "host"
    //     )}${imageLocation.replace("/dist", "")}}`;

    //     category.thumbnail = imageUrl;

    //     await category.save();

    //     res.status(200).send({
    //       message: "Image uploaded successfully",
    //       success: true,
    //       image: imageLocation,
    //       category: { ...category._doc },
    //     });
    //   } else {
    //     res
    //       .status(400)
    //       .send({ message: "No file was provided", success: false });
    //   }
    // });
    console.log("hello c");

    category.thumbnail = req.imageUrl;

    await category.save();

    res.status(200).send({
      message: "Image uploaded successfully",
      success: true,
      image: req.imageUrl,
      category: { ...category._doc },
    });
  } catch (error) {
    res.status(400).send({ message: err.message, success: false });
  }
});

export { createCategory, updateCategory, getCategories, addCategoryThumbnail };
