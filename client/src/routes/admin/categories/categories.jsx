import React from "react";
import DataTable from "../component/datatable";
import { columns } from "./tableConfig";
import Dialog from "./addCategoryPopUp";
import Navbar from "../component/nav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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
      <div className="container flex flex-col py-6">
        <div className="flex">
          <Dialog />
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
