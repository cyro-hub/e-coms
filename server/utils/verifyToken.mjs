import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.mjs";
import Customer from "../models/customer.mjs";

const authenticateCustomer = asyncHandler(async (req, res, next) => {
  let token = req.cookies.token

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.customerId = decoded.customerId

      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }else{
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});


export default authenticateCustomer;

