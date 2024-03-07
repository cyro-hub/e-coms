import { Router } from "express";

const productRoutes = Router()

productRoutes.get('/', (req, res) => {
  res.send('Hello World products')
})

export default productRoutes

