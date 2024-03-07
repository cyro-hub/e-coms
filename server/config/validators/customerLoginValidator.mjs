import { body, check } from "express-validator";

const customerLoginValidator = [
  body("password")
    .isString()
    .withMessage("password must have atleast a string and a letters combined")
    .isLength({ min: 8, max: 15 })
    .withMessage(
      "password must be at least 8 character or less than 15 characters"
    )
    .notEmpty()
    .withMessage("The password must not be empty"),
  // Use the check middleware to validate the 'email' field
  check("email")
    .isEmail() // Ensure the value is an email address
    .withMessage("Please enter a valid email address"),
];

export default customerLoginValidator;