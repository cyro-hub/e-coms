/** @format */

import React, { useState } from "react";
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

  return (
    <div className='flex items-center mx-8 px-6 py-5'>
      <div className='flex w-2/5'>
        <div className='w-20'>
          <img className='h-24' src={thumbnail} alt='' />
        </div>
        <div className='flex flex-col justify-between ml-4 flex-grow'>
          <span className='font-bold text-sm'>{name}</span>
          <span className='text-gray-300 text-xs'>{brand}</span>
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
      <div className='flex justify-center w-1/5'>
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
      <span className='text-center w-1/5 font-semibold text-sm'>
        {(price - (discount > 0 && (discount / 100) * price)).toFixed(3)} kd
      </span>
      <span className='text-center w-1/5 font-semibold text-sm'>
        {(
          (price - (discount > 0 && (discount / 100) * price)) *
          newQuantity
        ).toFixed(3)}{" "}
        kd
      </span>
    </div>
  );
}
