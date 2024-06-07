/** @format */

import { Router } from "express";
import customerRoutes from "./customerRouter.mjs";
import productRoutes from "./productRouter.mjs";
import userRoutes from "./userRouter.mjs";
import categoryRouter from "./categoryRouter.mjs";
import orderRouter from "./orderRouter.mjs";
import brandRouter from "./brandRouter.mjs";

const routes = Router();

routes.use("/customer", customerRoutes);
routes.use("/product", productRoutes);
routes.use("/user", userRoutes);
routes.use("/category", categoryRouter);
routes.use("/order", orderRouter);
routes.use("/brand", brandRouter);

export default routes;
