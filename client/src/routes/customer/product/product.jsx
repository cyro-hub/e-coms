/** @format */

import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/product";
import Footer from "../components/footer";
import Nav from "../components/nav-sm";
import Images from "./images";
import SideDetails from "./sideDetails";
import Reviews from "./Reviews";

function product() {
  const { productId } = useParams();

  const { data, refetch } = useQuery({
    queryKey: [`productId`, { productId }],
    queryFn: getProductById,
  });

  const { images } = data?.product ?? {};

  return (
    <>
      <Nav />
      <div className='container w-full flex flex-col items-center justify-center no-scrollbar'>
        <div className='flex flex-col lg:flex-row p-2 gap-8  justify-evenly items-center lg:items-start'>
          <div className='lg:w-[40vw] w-[100vw] p-6'>
            <Images images={images} />
          </div>
          <div className='flex w-[100%] flex-col p-4 py-10'>
            <SideDetails {...(data?.product ?? {})} />
          </div>
        </div>
        <div className='flex justify-start w-full py-6'>
          <Reviews {...(data?.product ?? {})} refetch={refetch} />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default product;
