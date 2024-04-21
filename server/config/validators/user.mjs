import * as yup from "yup";

const userValidator = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(40, "Name must be less than 15 characters")
    .required("Name is required"),
  employeeId: yup
    .string()
    .transform((value) => {
      if (typeof value === "number") return value.toString();
      return value;
    })
    .min(4, "Employee Id must be at least 4 characters")
    .required("Employee Id is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

const userUpdateValidator = yup.object().shape({
  name: yup
    .string()
    .min(4, "Name must be at least 4 characters")
    .max(40, "Name must be less than 15 characters")
    .required("Name is required"),
  employeeId: yup
    .string()
    .transform((value) => {
      if (typeof value === "number") return value.toString();
      return value;
    })
    .min(4, "Employee Id must be at least 4 characters")
    .required("Employee Id is required"),
  role: yup.array().of(yup.string()).min(1, "The role cannot be empty"),
  isActive: yup.boolean().required("isActive Id is required"),
});

const userDeleteValidator = yup.object().shape({
  employeeId: yup
    .string()
    .transform((value) => {
      if (typeof value === "number") return value.toString();
      return value;
    })
    .min(4, "Employee Id must be at least 4 characters")
    .required("Employee Id is required"),
  isActive: yup.boolean().required("isActive is required"),
});

const userLoginValidator = yup.object().shape({
  employeeId: yup
    .string()
    .transform((value) => {
      if (typeof value === "number") return value.toString();
      return value;
    })
    .min(4, "Employee Id must be at least 4 characters")
    .required("Employee Id is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least one letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .required("Password is required"),
});

export {
  userValidator,
  userDeleteValidator,
  userLoginValidator,
  userUpdateValidator,
};
