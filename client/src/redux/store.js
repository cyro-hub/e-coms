import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice/user";
import categoryReducer from "./features/categorySlice/category";
import productReducer from "./features/productSlice/product";

export default configureStore({
  reducer: {
    userState: userReducer,
    categoryState: categoryReducer,
    productState: productReducer,
  },
});
