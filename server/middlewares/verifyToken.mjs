import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.mjs";
import Customer from "../models/customer.mjs";

const authenticateCustomer = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token;

  // if (token) {
  //   try {
  //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

  //     // const customer = await Customer.findById({ id: decoded.id });
  //     console.log(decoded);

  //     req.id = decoded.id;
  //     // req.customer = customer;

  //     next();
  //   } catch (error) {
  //     res.status(401);
  //     throw new Error("Not authorized, token failed");
  //   }
  // } else {
  //   res.status(401);
  //   throw new Error("Not authorized, no token");
  // }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.id = decoded.id;
      req.customer = await Customer.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed.");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token.");
  }
});

export default authenticateCustomer;
