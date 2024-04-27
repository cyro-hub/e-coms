/** @format */

import React from "react";
import { FaShopify, FaStar } from "react-icons/fa";
import { handleAddToCart } from "@/utils/utils";
import "./styles.css";

function sideDetails({
  name,
  price,
  description,
  thumbnail,
  category,
  brand,
  rating,
  quantity,
  reviews,
  discount,
  _id,
}) {
  return (
    <>
      <div className='flex gap-4'>
        <p className='text-lg'>{brand || "brand"}</p>
        <div className='flex gap-2 items-center'>
          {quantity > 0 ? (
            <>
              <div className='h-4 w-4 bg-green-500 rounded-full'></div>in stock
            </>
          ) : (
            <>
              <div className='h-4 w-4 bg-orange-500 rounded-full'></div> out of
              stock
            </>
          )}
        </div>
      </div>
      <h2 className='text-2xl font-bold my-4'>{name || "name"}</h2>
      <div className='flex items-center'>
        {[1, 2, 3, 4, 5].map((index) => (
          <FaStar
            key={index}
            size={18}
            className={`${
              rating >= index ? "text-yellow-500" : "text-gray-300"
            } mx-1`}
          />
        ))}
        <span className='px-4'>
          {` ${rating}.0 (${reviews?.length} ${
            reviews?.length > 1
              ? " reviews"
              : reviews?.length == 1
              ? " review"
              : " reviews"
          })`}
        </span>
      </div>
      <div className='flex mt-8 gap-8 font-bold items-center'>
        <p
          className={`${
            discount > 0 ? "line-through text-red-500 text-xl" : "text-2xl"
          } `}>
          {price?.toFixed(3)} kd
        </p>
        <p className='text-2xl'>
          {discount > 0 &&
            (price - (discount / 100) * price)?.toFixed(3) + " kd"}
        </p>
        <div className='bg-yellow-200 text-yellow-800 rounded-md p-2 text-md'>
          {discount}% off
        </div>
      </div>
      <div className='flex items-center mt-4'>
        <button
          //   className='mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-[100%]'
          className='btn-adt-to-cart'
          onClick={() =>
            handleAddToCart({
              name,
              price,
              thumbnail,
              productId: _id,
              brand,
              discount,
            })
          }>
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default sideDetails;
