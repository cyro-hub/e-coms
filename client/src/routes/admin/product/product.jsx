/** @format */

import React from "react";
import DataTable from "../component/datatable";
import { columns } from "./tableConfig";
import Navbar from "../component/nav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/api/product";
import { Link } from "react-router-dom";

function Products() {
  const { data, error, isFetching, status } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  if (error) {
    toast("Something happened, reload the page");
  }

  return (
    <>
      <Navbar />
      <div className='container flex flex-col py-6'>
        <div className='flex'>
          <Link
            to='/admin/product/add'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Add Product
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={status === "success" ? data?.products : []}
          filterColumn={"name"}
          isLoading={isFetching}
          isError={error}
        />
      </div>
    </>
  );
}

const datas = [
  {
    id: "m5gr84i9",
    name: "316",
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    name: "242",
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    name: "837",
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    name: "874",
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    name: "721",
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "bhqecj4p",
    name: "721",
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "bhqecj4p",
    name: "721",
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

export default Products;
