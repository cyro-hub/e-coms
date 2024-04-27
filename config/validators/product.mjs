import * as yup from "yup";

const productValidator = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  brand: yup
    .string()
    .min(4, "Brand must be at least 4 characters")
    .max(50, "Brand must be less than 50 characters")
    .required("Brand is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters")
    .required("Description is required"),
  quantity: yup.number().required("The quantity required"),
  price: yup.number().required("The price required"),
  category: yup.string().required("The category required"),
});

export { productValidator };
