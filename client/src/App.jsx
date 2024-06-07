/** @format */

import React, { useEffect } from "react";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./redux/features/categorySlice/category";
import { getBrands } from "./redux/features/brandSlice/brand";

//importing the route protection
import ProtectedRoute from "./routes/admin/auth/protectedRoute";

//importing customers component
import Customer from "./routes/customer/index";
import CustomerShop from "./routes/customer/shop/shop";
import CustomerHome from "./routes/customer/home/home";
import CustomerLogin from "./routes/customer/auth/login";
import CustomerRegister from "./routes/customer/auth/register";
import CustomerCart from "./routes/customer/cart/cart";
import Checkout from "./routes/customer/checkout/Checkout";
import Profile from "@/routes/customer/profile/profile";

// importing admin home
import Admin from "./routes/admin/index";
import AdminHome from "./routes/admin/home/home";

//importing category routes
import ManageCategory from "./routes/admin/categories/categories";
import AddCategory from "./routes/admin/categories/addCategory";
import UpdateCategory from "./routes/admin/categories/updateCategory";
import AddCategoryThumbnail from "./routes/admin/categories/addCategoryThumbnail";

//importing brand routes
import ManageBrand from "@/routes/admin/brands/brands";
import AddBrand from "@/routes/admin/brands/addBrand";
import AddBrandThumbnail from "@/routes/admin/brands/addBrandThumbnail";
import UpdateBrand from "@/routes/admin/brands/updateBrand";

//importing product routes
import AddProduct from "./routes/admin/product/AddProduct";
import ViewProduct from "@/routes/admin/product/ViewProduct";

import ManageUser from "./routes/admin/user/users";
import AdminAuth from "./routes/admin/auth/auth";
import ManageCustomer from "./routes/admin/customer/customer";
import ManageProducts from "./routes/admin/product/product";
import UploadProductImage from "./routes/admin/product/uploadProductImage";
import UploadProductThumbnail from "./routes/admin/product/uploadProductThumbnail";
import ViewProductDetails from "./routes/admin/product/ViewProduct";
import ProductDetails from "./routes/customer/product/product";
import Authenticator from "./routes/customer/auth/auth";
import UpdateProduct from "./routes/admin/product/updateProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CustomerHome />,
  },
  {
    path: "/shop",
    element: <CustomerShop />,
  },
  {
    path: "/product/:id",
    element: <ProductDetails />,
  },
  {
    path: "/auth",
    element: <CustomerLogin />,
  },
  {
    path: "/register",
    element: <CustomerRegister />,
  },
  {
    path: "/cart",
    element: <CustomerCart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/shop/:query",
    element: <CustomerShop />,
  },
  {
    path: "/admin",
    element: <AdminHome />,
  },
  {
    path: "/admin/product",
    element: <ManageProducts />,
  },
  {
    path: "/admin/user",
    element: <ManageUser />,
  },
  {
    path: "/admin/customers",
    element: <ManageCustomer />,
  },
  {
    path: "/admin/auth",
    element: <AdminAuth />,
  },
  {
    path: "/admin/product/category",
    element: <ManageCategory />,
  },
  {
    path: "/admin/product/category/add",
    element: <AddCategory />,
  },
  {
    path: "/admin/product/category/update/:id/:name",
    element: <UpdateCategory />,
  },
  {
    path: "/admin/product/category/upload/:id/:name",
    element: <AddCategoryThumbnail />,
  },
  {
    path: "/admin/product/brand",
    element: <ManageBrand />,
  },
  {
    path: "/admin/product/brand/add",
    element: <AddBrand />,
  },
  {
    path: "/admin/product/brand/update/:id/:name",
    element: <UpdateBrand />,
  },
  {
    path: "/admin/product/brand/upload/:id/:name",
    element: <AddBrandThumbnail />,
  },
  {
    path: "/admin/product/add",
    element: <AddProduct />,
  },
  {
    path: "/admin/product/:id",
    element: <ViewProduct />,
  },
  {
    path: "/admin/product/update/:id",
    element: <UpdateProduct />,
  },
  {
    path: "/admin/product/upload/:id",
    element: <UploadProductImage />,
  },
  {
    path: "/admin/product/upload/thumbnail/:id",
    element: <UploadProductThumbnail />,
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
