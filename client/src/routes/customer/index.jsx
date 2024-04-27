/** @format */

import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { useDispatch, useSelector } from "react-redux";
import { authenticateUser } from "@/api/customer";
import { useMutation } from "@tanstack/react-query";
import { setAuthState } from "@/redux/features/userSlice/user";

function Index() {
  const customer = useSelector((state) => state.userState.user);

  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationFn: authenticateUser,
    onSuccess: ({ message, success, customer }) => {
      if (success) {
        dispatch(setAuthState());
        dispatch({
          type: "user/setUser",
          payload: customer,
        });
        return;
      }
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default Index;
