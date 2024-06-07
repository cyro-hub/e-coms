/** @format */

import * as yup from "yup";

const categoryValidator = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
});

export { categoryValidator };
