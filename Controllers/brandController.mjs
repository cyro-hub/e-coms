/** @format */

import Brand from "../models/brand.mjs";
import asyncHandler from "../middlewares/asyncHandler.mjs";
import { brandValidator } from "../config/validators/brand.mjs";

const createBrand = asyncHandler(async (req, res) => {
  await brandValidator.validate(req.body);

  const { name } = req.body;

  try {
    const brand = new Brand({ name: name });

    await brand.save();

    res.status(201).json({
      message: "Brand successfully created",
      success: true,
      brand: { ...brand._doc },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate brand make sure no same brand exist",
        success: false,
        brand: null,
      });
    }
    return res.status(400).json({
      message: "Failed to add brand",
      success: false,
      brand: null,
    });
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  await brandValidator.validate(req.body);

  const { name } = req.body;

  try {
    const brand = await Brand.findOne({ _id: req.params.id });

    if (!brand) {
      throw new Error("Brand not found");
    }

    brand.name = name || brand.name;

    const updatedBrand = await brand.save();

    res.status(201).json({
      message: "Brand successfully updated",
      success: true,
      brand: { name: updatedBrand.name },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate brand make sure no same brand exist",
        success: false,
        brand: null,
      });
    }
    res.status(400).json({
      message: error.message,
      success: false,
      category: null,
    });
  }
});

const getBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json([...brands]);
  } catch (error) {
    throw new Error(error.message);
  }
});

const addBrandThumbnail = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.findOne({ _id: req.params.id });

    brand.thumbnail = req.imageUrl;

    await brand.save();

    res.status(200).send({
      message: "Image uploaded successfully",
      success: true,
      image: req.imageUrl,
      brand: { ...brand._doc },
    });
  } catch (error) {
    res.status(400).send({ message: err.message, success: false });
  }
});

export { createBrand, updateBrand, getBrands, addBrandThumbnail };
