/** @format */

import { Router } from "express";
import customerRoutes from "./customerRouter/customerRouter.mjs";
import productRoutes from "./productRouter/productRouter.mjs";
import userRoutes from "./userRouter/userRouter.mjs";
import categoryRouter from "./categoryRouter/categoryRouter.mjs";
import orderRouter from "./orderRouter/orderRouter.mjs";

const routes = Router();

routes.use("/customer", customerRoutes);
routes.use("/products", productRoutes);
routes.use("/user", userRoutes);
routes.use("/category", categoryRouter);
routes.use("/order", orderRouter);

export default routes;
