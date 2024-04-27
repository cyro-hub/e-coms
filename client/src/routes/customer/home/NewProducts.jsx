/** @format */

import React, { Fragment, useEffect, useMemo } from "react";
import Card from "@/routes/customer/shop/card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNewProducts } from "@/api/product";
import { IoBagAdd } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import "swiper/css";

function NewProducts() {
  const { ref, inView } = useInView();
  const dispatch = useDispatch();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["newProducts"],
    queryFn: getNewProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages?.length + 1 : undefined;
    },
  });

  const dispatchProducts = useMemo(() => {
    if (data?.pages[data?.pages.length - 1]?.success) {
      return () => {
        dispatch({
          type: "product/setProducts",
          payload: data?.pages.map((obj) => obj.products).flat(),
        });
      };
    }
    return () => {};
  }, [dispatch, data]);

  useEffect(() => {
    dispatchProducts();
  }, [dispatchProducts]);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, data, fetchNextPage]);

  return (
    <>
      <section className='text-gray-700 body-font'>
        <div className='container px-5 pt-14 mx-auto'>
          <div className='flex flex-col text-center w-full mb-10'>
            <h1 className='sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900'>
              New Products
            </h1>
            <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
              Check out our latest products. Stay ahead with the latest
              technology.
            </p>
          </div>
        </div>
      </section>
      <div className='no-scrollbar gap-8 items-center justify-center flex overflow-auto sm: lg:container'>
        <Swiper
          // onSlideChange={() => console.log("slide change")}
          // onSwiper={(swiper) => console.log(swiper)}
          className='h-[400px] py-4 pt-8'
          breakpoints={{
            400: {
              slidesPerView: 1,
            //   spaceBetween: 5,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1400: {
              slidesPerView: 5,
              spaceBetween: 25,
            },
          }}>
          {data?.pages.map((page) =>
            page.products.map((product, index) => (
              <SwiperSlide key={product._id}>
                <Card {...product} />
              </SwiperSlide>
            ))
          )}
          {isFetching &&
            Array.from({ length: 10 }, (_, index) => (
              <SwiperSlide key={index + "a"}>
                <div className='animate-pulse flex flex-col justify-center items-center space-x-4 gap-2 w-[300px]'>
                  <div className='w-[100%] h-[350px] rounded-md bg-gray-400'></div>
                  <div className='bg-gray-400  w-[200px] h-6 rounded-md'></div>
                  <div className='bg-gray-400  w-[150px] h-6 rounded-md'></div>
                  <IoBagAdd size={30} className='mb-[-10px] z-40 none' />
                </div>
              </SwiperSlide>
            ))}
          {!isFetching && data?.pages[0]?.products.length === 0 && (
            <div className='text-center py-10'>
              <p className='text-gray-500'>No products found.</p>
            </div>
          )}
        </Swiper>

        <div ref={ref}></div>
      </div>
    </>
  );
}

export default NewProducts;
