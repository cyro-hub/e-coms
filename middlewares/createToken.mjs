import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.mjs";

export default asyncHandler(async (res, id) => {
  const token = jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: false,// set to true on production
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  };

  res.cookie("token", token, options);

  return token
});

