import { Router } from "express";
import customerRoutes from './customerRouter/customerRouter.mjs'
import productRoutes from './productRouter/productRouter.mjs'

const routes = Router()

routes.use('/customer', customerRoutes) 
routes.use('/product', productRoutes) 

export default routes

