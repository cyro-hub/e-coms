/** @format */

import { Router } from "express";
import {
  createOrder,
  getAllOrders,
  getCustomerOrders,
  countTotalOrders,
  calculateTotalSales,
  calculateTotalSalesByDate,
  findOrderById,
  markOrderAsPaid,
  markOrderAsDelivered,
} from "../../Controllers/order/orderController.mjs";
import authenticate from "../../middlewares/verifyToken.mjs";

const orderRouter = Router();

orderRouter.route("/").post(authenticate, createOrder).get(getAllOrders);

//add admin previleges
orderRouter.route("/total-order-count").get(countTotalOrders);
orderRouter.route("/total-sales").get(calculateTotalSales);
orderRouter.route("/total-sales-by-date").get(calculateTotalSalesByDate);
orderRouter.route("/mark-order-as-delivered/:id").post(markOrderAsDelivered);

orderRouter.route("/customer").get(authenticate, getCustomerOrders);
orderRouter
  .route("/mark-order-as-paid/:id")
  .post(authenticate, markOrderAsPaid);

//add admin previleges
orderRouter.route("/:id").get(authenticate, findOrderById);

export default orderRouter;
