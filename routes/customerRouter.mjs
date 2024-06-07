/** @format */

import { Router, json } from "express";
import {
  createCustomer,
  verifyCustomer,
  logoutCurrentCustomer,
  getCustomerProfile,
  updateCustomerProfile,
  deleteCustomerProfile,
  getCustomers,
  getCustomerAuthenticated,
} from "../Controllers/customerController.mjs";
import authenticateCustomer from "../middlewares/verifyToken.mjs";

const customerRoutes = Router();
customerRoutes.use(json());

customerRoutes.route("/").post(createCustomer).get(getCustomers);

customerRoutes.post("/auth", verifyCustomer);

customerRoutes.post("/verify", authenticateCustomer, getCustomerAuthenticated);

customerRoutes.post("/logout", logoutCurrentCustomer);

customerRoutes
  .route("/profile")
  .get(authenticateCustomer, getCustomerProfile)
  .put(authenticateCustomer, updateCustomerProfile)
  .delete(authenticateCustomer, deleteCustomerProfile);

export default customerRoutes;
