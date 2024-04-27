/** @format */

import React from "react";
import { useSelector } from "react-redux";
import Navbar from "@/routes/customer/components/nav";
import { useQuery } from "@tanstack/react-query";
import { getCustomersOrders } from "@/api/order";
import OrderDetails from "./orderDetails";

const ProfilePage = () => {
  const customer = useSelector((state) => state.userState.user);

  const { data } = useQuery({
    queryKey: ["customerOrders", {}],
    queryFn: getCustomersOrders,
  });

  console.log(data);

  return (
    <>
      <Navbar />
      <div className='container mx-auto mt-10 px-4 sm:px-6 lg:px-8'>
        <div className='my-4'>
          <p>Name: {customer?.name}</p>
          <p>Email: {customer?.email}</p>
          <button className='mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            Update Details
          </button>
        </div>
        <div className='my-4'>
          <h3 className='text-lg font-bold'>Orders:</h3>
          <div className='grid grid-cols-1 gap-4'>
            {data?.orders?.map((order) => (
              <OrderDetails {...order} key={order._id} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
