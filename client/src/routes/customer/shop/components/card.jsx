/** @format */

import React from "react";
import { Link } from "react-router-dom";
import productImage from "./product-3.png";
import { IoBagAdd } from "react-icons/io5";
import "./card.scss";
import { FaStar } from "react-icons/fa";
import { handleAddToCart } from "@/utils/utils";

function card({ name, _id, price, thumbnail, rating, brand, discount }) {
  return (
    <div className='flex flex-col justify-center items-center'>
      <Link
        className='product-card flex flex-col justify-center items-center gap-2 max-w-[300px] mb-4'
        to={`/product/${_id}`}>
        <img
          src={thumbnail}
          className='transition-all ease-in-out duration-500 h-[200px]'
        />
        <span className='rounded-md flex justify-center flex-col items-center transition-all ease-in-out duration-500 span-container'>
          {/* <h3 className=''>{name}</h3> */}
          <h3 className='card-name'>{name}</h3>
          <div className='flex items-center mt-1'>
            <span className='text-sm font-semibold mr-2'>Rating:</span>
            <div className='flex'>
              {[1, 2, 3, 4, 5].map((index) => (
                <FaStar
                  key={index}
                  size={14}
                  className={`${
                    rating >= index ? "text-yellow-500" : "text-gray-300"
                  } mx-1`}
                />
              ))}
            </div>
          </div>
          <strong className='text-xl'>{price} kwd</strong>
        </span>

        <span className='cover transition-all ease-in-out duration-500'></span>
      </Link>
      <IoBagAdd
        onClick={() =>
          handleAddToCart({
            name,
            productId: _id,
            price,
            thumbnail,
            brand,
            discount,
          })
        }
        size={30}
        className='mb-[10px] z-40 none'
      />
    </div>
  );
}

export default card;
