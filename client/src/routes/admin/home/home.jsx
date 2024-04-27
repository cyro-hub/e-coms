import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { BiSolidCategory } from "react-icons/bi";
import { FaShopify } from "react-icons/fa";
import DataTable from "../component/datatable";
import { columns } from "./tableConfig";
import { Link } from "react-router-dom";
import Navbar from "../component/nav";
import { useDispatch, useSelector } from "react-redux";

function home() {
  const { categories } = useSelector((state) => state.categoryState);
  return (
    <>
      <Navbar />
      <div className="container my-8">
        <div className="container flex flex-col justify-between items-center gap-6 md:flex-row">
          <div className="flex flex-col bg-[#eeeeee10] rounded-md w-full">
            <Link
              className="flex flex-col p-4 gap-4 flex-1 justify-center items-center "
              to="/admin/product/category">
              <BiSolidCategory size={25} />
              <span className="font-semibold text-2xl">
                {categories.length} Categories
              </span>
            </Link>
          </div>
          <div className="flex flex-col bg-[#eeeeee10] rounded-md w-full">
            <Link
              className="flex flex-col p-4 gap-4 flex-1 justify-center items-center "
              to="/admin/customers">
              <HiUserGroup size={25} />
              <span className="font-semibold text-2xl">40 Customer</span>
            </Link>
          </div>
          <div className="flex flex-col bg-[#eeeeee10] rounded-md w-full">
            <Link
              className="flex flex-col p-4 gap-4 flex-1 justify-center items-center "
              to="/admin/product">
              <FaShopify size={25} />
              <span className="font-semibold text-2xl">40 Orders</span>
            </Link>
          </div>
        </div>
        {/* add a chart as required */}
        <div className="container">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}

const data = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

export default home;
