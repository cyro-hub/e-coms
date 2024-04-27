import React from "react";
import DataTable from "../component/datatable";
import { columns } from "./tableConfig";
// import Dialog from "./addCategoryPopUp";
import Navbar from "../component/nav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Customers() {
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
        {/* <div className="flex"><Dialog /></div> */}
        <DataTable
          columns={columns}
          data={data}
          filterColumn={"email"}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
}

const data = [
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

export default Customers;
