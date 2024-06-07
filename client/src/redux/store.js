/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice/user";
import categoryReducer from "./features/categorySlice/category";
import productReducer from "./features/productSlice/product";
import brandReducer from "./features/brandSlice/brand";

export default configureStore({
  reducer: {
    userState: userReducer,
    categoryState: categoryReducer,
    productState: productReducer,
    brandState: brandReducer,
  },
});
