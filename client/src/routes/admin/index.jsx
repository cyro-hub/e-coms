import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

function Index() {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default Index;
