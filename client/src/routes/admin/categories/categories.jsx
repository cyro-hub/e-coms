/** @format */

import React from "react";
import DataTable from "../component/datatable";
import { columns } from "./tableConfig";
import Navbar from "../component/nav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Link } from "react-router-dom";

function categories() {
  const { isLoading, isError, categories } = useSelector(
    (state) => state.categoryState
  );

  if (isError) {
    toast("Something happened, reload the page");
  }
  return (
    <>
      <Navbar />
      <div className='container flex flex-col py-6'>
        <div className='flex'>
          <Link
            to='/admin/product/category/add'
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Add Category
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={categories}
          filterColumn={"name"}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
}

export default categories;
