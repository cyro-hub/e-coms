/** @format */

import Customer from "../../models/customer.mjs";
import hash from "../../config/password/hash.mjs";
import compare from "../../config/password/compare.mjs";
import asyncHandler from "../../middlewares/asyncHandler.mjs";
import createToken from "../../middlewares/createToken.mjs";
import {
  customerValidator,
  customerAuthValidator,
} from "../../config/validators/customer.mjs";

const getCustomers = asyncHandler(async (req, res) => {
  try {
    const customers = await Customer.find().select("-password");
    res.status(200).json({ customers });
  } catch (error) {
    throw new Error(error.message);
  }
});

const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (customer) {
    res
      .status(200)
      .json({
        message: "Successfull request",
        customer: customer,
        success: true,
      });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

const createCustomer = asyncHandler(async (req, res) => {
  await customerValidator.validate(req.body);

  // const { email } = req.body;

  // const findCustomer = await Customer.findOne({ email });

  // if (findCustomer && findCustomer.isActive) {
  //   res.status(400);
  //   throw new Error("Customer already exists");
  // }else if(findCustomer && !findCustomer.isActive){
  //   req.id = findCustomer._id
  //   updateCustomerProfile(req,res)
  // }

  try {
    const customer = req.body;

    customer.password = hash(customer.password);

    const newCustomer = await Customer.create(customer);

    newCustomer.save();

    const token = createToken(res, newCustomer._id);

    res.status(201).json({
      message: "Customer successfully created",
      success: true,
      customer: { name: newCustomer.name, email: newCustomer.email },
      auth: token,
    });
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Invalid credentials");
    }
    throw new Error(error.message);
  }
});

const verifyCustomer = asyncHandler(async (req, res) => {
  await customerAuthValidator.validate(req.body);

  const { email, password } = req.body;

  const customer = await Customer.findOne({ email });

  if (customer && compare(password, customer.password)) {
    const token = createToken(res, customer._id);
    return res.status(200).json({
      message: "Customer successfully login",
      customer: { name: customer.name, email: customer.email },
      success: true,
      auth: token,
    });
  }

  res.status(401);
  throw new Error("Invalid email or password");

  return;
});

const logoutCurrentCustomer = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ message: "Logged out successfully" });
});

const getCustomerProfile = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.id).select("-password");
  if (customer) {
    res.status(200).json({ customer });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

const updateCustomerProfile = asyncHandler(async (req, res) => {
  await customerValidator.validate(req.body);

  const customer = await Customer.findOne({ _id: req.id });

  if (customer) {
    try {
      customer.name = req.body.name;
      customer.email = req.body.email;
      customer.isActive = true;

      const updatedCustomer = await customer.save();

      res.status(200).json({
        _id: updatedCustomer._id,
        name: updatedCustomer.name,
        email: updatedCustomer.email,
      });
    } catch (error) {
      res.status(404);
      throw new Error(
        "Unable to update your info try again or contact the support team"
      );
    }
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

const deleteCustomerProfile = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.customerId);

  if (customer) {
    customer.isActive = false;

    await customer.save();

    res.status(200).json({ message: "Customer deleted successfully" });
  } else {
    res.status(404);
    throw new Error("Customer not found");
  }
});

const getCustomerAuthenticated = asyncHandler(async (req, res) => {
  return res.status(200).json({
    message: "Customer successfully login",
    customer: { name: req.customer.name, email: req.customer.email },
    success: true,
    // auth: token,
  });
});

export {
  getCustomers,
  getCustomerById,
  createCustomer,
  verifyCustomer,
  logoutCurrentCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  deleteCustomerProfile,
  getCustomerAuthenticated,
};
