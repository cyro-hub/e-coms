/** @format */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./components/card";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts, getFilteredProducts } from "@/api/product";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { useInView } from "react-intersection-observer";
import Footer from "@/routes/customer/components/footer";
import { IoBagAdd } from "react-icons/io5";
import Navbar from "@/routes/customer/shop/components/Nav";

function Shop() {
  const { query } = useParams();
  const [size, setSize] = useState(window.innerWidth);
  const { products, filters } = useSelector((state) => state.productState);
  const dispatch = useDispatch();
  const { ref, inView } = useInView();

  const windowSizeChecker = () => setSize(window.innerWidth);

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
    queryKey: ["products", { keyword: query || "", filters: filters }],
    queryFn: filters ? getFilteredProducts : getProducts,
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

  useEffect(() => {
    window.addEventListener("resize", windowSizeChecker);

    return () => window.removeEventListener("resize", windowSizeChecker);
  });

  return (
    <>
      <Navbar />
      <div className='flex-1'>
        {/* <div className='h-full no-scrollbar p-2 overflow-y-auto overflow-x-hidden flex flex-wrap items-center justify-center gap-10 pt-14'> */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 pt-14'>
          {data?.pages?.map((page) =>
            page.products?.map((product, index) => (
              <Card {...product} key={product._id} />
            ))
          )}
          {isFetching &&
            Array.from({ length: 10 }, (_, index) => (
              <div
                key={index}
                className='animate-pulse flex flex-col justify-center items-center space-x-4 gap-2 w-[300px]'>
                <div className='w-[100%] h-[350px] rounded-md bg-gray-400'></div>
                <div className='bg-gray-400  w-[200px] h-6 rounded-md'></div>
                <div className='bg-gray-400  w-[150px] h-6 rounded-md'></div>
                <IoBagAdd size={30} className='mb-[-10px] z-40 none' />
              </div>
            ))}
          {!isFetching && data?.pages[0]?.products?.length === 0 && (
            <div className='text-center py-10'>
              <p className='text-gray-500'>No products found.</p>
            </div>
          )}
          <div ref={ref}></div>
        </div>
      </div>
    </>
  );
}

export default Shop;
