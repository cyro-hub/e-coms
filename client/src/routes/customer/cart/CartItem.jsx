/** @format */

import React, { useEffect, useState } from "react";
import {
  handleChangeItemQuantity,
  handleGetCart,
  handleRemoveFromCart,
} from "@/utils/utils";

export function CartItem({
  _id,
  name,
  thumbnail,
  brand,
  qty,
  price,
  setCartItems,
  discount,
}) {
  const [newQuantity, setNewQuantity] = useState(qty);
  const [screenSize, setScreenSize] = useState(window.innerWidth);
  const checkScreenSize = () => setScreenSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  });

  return (
    <div className={`flex items-center py-5 flex-1 a gap-4`}>
      <div className='flex w-2/5'>
        <div className='w-20'>
          <img className='h-24 min-w-20' src={thumbnail} alt='' />
        </div>
        <div className='flex flex-col justify-between ml-4 flex-grow'>
          <span className='font-bold text-sm'>{name}</span>
          <span className='text-gray-300 text-xs'>{brand?.name}</span>
          <span
            onClick={() => {
              handleRemoveFromCart(_id);
              setCartItems(handleGetCart);
            }}
            className='font-semibold hover:text-red-500 text-gray-500 text-xs'>
            Remove
          </span>
        </div>
      </div>
      <div
        className={`flex justify-evenly flex-1  ${
          screenSize < 700 && "flex-col gap-3 items-end"
        }  w-1/5`}>
        <div className='flex gap-4 items-center'>
          {screenSize < 700 && `Quantity`}
          <input
            className='mx-2 border bg-transparent text-center w-8'
            type='number'
            value={newQuantity}
            onChange={(e) => setNewQuantity(e.target.value)}
            min='1'
            max='99'
            onBlur={() => {
              handleChangeItemQuantity(newQuantity, id);
              setCartItems(handleGetCart);
            }}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleChangeItemQuantity(newQuantity, id);
                setCartItems(handleGetCart);
              }
            }}
          />
        </div>
        <div className='flex gap-4 items-center'>
          {screenSize < 700 && `Amount`}{" "}
          <span className='text-center w-1/5 font-semibold text-sm'>
            {(price - (discount > 0 && (discount / 100) * price)).toFixed(3)} kd
          </span>
        </div>
        <div className='flex gap-4 items-center'>
          {screenSize < 700 && `Total`}
          <span className='text-center w-1/5 font-semibold text-sm'>
            {(
              (price - (discount > 0 && (discount / 100) * price)) *
              newQuantity
            ).toFixed(3)}{" "}
            kd
          </span>
        </div>
      </div>
    </div>
  );
}
