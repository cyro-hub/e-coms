/** @format */

import * as yup from "yup";

const orderValidator = yup.object().shape({
  orderItems: yup.array().of(
    yup.object().shape({
      name: yup.string().required(),
      qty: yup.number().required(),
      thumbnail: yup.string().required(),
      price: yup.number().required(),
      discount: yup.number().required(),
      _id: yup.string().required(),
    })
  ),
  shippingAddress: yup.object().shape({
    governorate: yup.string().required(),
    city: yup.string().required(),
    block: yup.string().required(),
    street: yup.string().required(),
    building: yup.string().required(),
    flatNumber: yup.string().required(),
  }),
  paymentMethod: yup.string().required(),
  shippingPrice: yup.number().required(),
});

export default orderValidator;
