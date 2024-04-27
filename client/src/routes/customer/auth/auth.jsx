/** @format */

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/customer";

function Authenticator() {
  const [auth, setAuth] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const mutation = useMutation({
    mutationFn: authenticateUser,
    onSuccess: ({ message, success, product }) => {
      setIsLoading(false);
      if (!success) {
        return;
      }
    },
  });

  useEffect(() => {
    mutation.mutate();
  }, []);

  return (
    <>
      {isLoading ? (
        <Outlet />
      ) : error ? (
        <Navigate to='/auth' replace={true} />
      ) : (
        <div className='spinning'>
          {/* <FadeLoader loading={true} size={200} color='white' /> */}
        </div>
      )}
    </>
  );
}

export default Authenticator;
