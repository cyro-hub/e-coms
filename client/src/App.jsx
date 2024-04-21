/** @format */

import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//importing customers component
import Customer from "./routes/customer/index";
import CustomerShop from "./routes/customer/shop/shop";
import CustomerHome from "./routes/customer/home/home";
import CustomerLogin from "./routes/customer/auth/login";
import CustomerRegister from "./routes/customer/auth/register";
import CustomerCart from "./routes/customer/cart/cart";
import Checkout from "./routes/customer/checkout/Checkout";
import Profile from "@/routes/customer/profile/profile";
// importing admin components
import Admin from "./routes/admin/index";
import AdminHome from "./routes/admin/home/home";
import ManageCategory from "./routes/admin/categories/categories";
import ManageUser from "./routes/admin/user/users";
import AdminAuth from "./routes/admin/auth/auth";
import ProtectedRoute from "./routes/admin/auth/protectedRoute";
import ManageCustomer from "./routes/admin/customer/customer";
import ManageProducts from "./routes/admin/product/product";
import ManageProductImageUpload from "./routes/admin/product/uploadProductImage";
import ManageProductThumbnailUpload from "./routes/admin/product/uploadProductThumbnail";
import ViewProductDetails from "./routes/admin/product/viewProduct";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "./redux/features/categorySlice/category";
import ProductDetails from "./routes/customer/product/product";
import Authenticator from "./routes/customer/auth/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Customer />,
    // errorElement: <Error />
    children: [
      {
        path: "shop/:query",
        element: <CustomerShop />,
      },
      {
        path: "shop",
        element: <CustomerShop />,
      },
      {
        path: "product/:productId",
        element: <ProductDetails />,
      },
      {
        path: "",
        element: <CustomerHome />,
      },
      {
        path: "auth",
        element: <CustomerLogin />,
      },
      {
        path: "register",
        element: <CustomerRegister />,
      },
      {
        path: "cart",
        element: <CustomerCart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/admin",
    element: (
      // <ProtectedRoute>
      <Admin />
      //{/* </ProtectedRoute> */}
    ),
    children: [
      {
        path: "",
        element: <AdminHome />,
      },
      {
        path: "product/category",
        element: <ManageCategory />,
      },
      {
        path: "user",
        element: <ManageUser />,
      },
      {
        path: "customers",
        element: <ManageCustomer />,
      },
      {
        path: "products",
        element: <ManageProducts />,
      },
      {
        path: "products/upload/:productId",
        element: <ManageProductImageUpload />,
      },
      {
        path: "products/thumbnail/:productId",
        element: <ManageProductThumbnailUpload />,
      },
      {
        path: "products/view/:productId",
        element: <ViewProductDetails />,
      },
    ],
  },
  {
    path: "admin/auth",
    element: <AdminAuth />,
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
