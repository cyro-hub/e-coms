/** @format */

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/product";
import ProductDetail from "./productDetail";
import Navbar from "../component/nav";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { useParams } from "react-router-dom";

function viewProduct() {
  const { productId } = useParams();
  const { data, isError, isPending, isSuccess } = useQuery({
    queryKey: ["product", { productId }],
    queryFn: getProductById,
  });

  return (
    <>
      <Navbar />
      <div className='container flex gap-4 justify-center items-center h-[100vh]'>
        <div className='flex flex-col gap-4 py-4 overflow-auto no-scrollbar justify-center'>
          <ProductDetail {...data?.product} />
        </div>
        <div className='flex gap-4 overflow-auto max-w-[50%] h-full no-scrollbar justify-center items-center'>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}>
            <CarouselContent>
              {data?.product?.images.map((image) => (
                <CarouselItem key={image}>
                  <img src={image} alt={image} className='rounded-md' />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </>
  );
}

export default viewProduct;
