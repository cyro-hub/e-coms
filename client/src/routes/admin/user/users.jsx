import React from "react";
import DataTable from "../component/datatable";
import { columns } from "./tableConfig";
import Dialog from "./addUserPopUp";
import Navbar from "../component/nav";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function users() {
  const { isLoading, isError, users } = useSelector((state) => state.userState);

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
          data={users}
          filterColumn={"employeeId"}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
}
