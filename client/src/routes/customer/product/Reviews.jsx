/** @format */

import React from "react";
import { FaShopify, FaStar } from "react-icons/fa";
import AddReview from "./AddReview";

function Reviews({ rating, reviews, _id, refetch }) {
  return (
    <div className='mt-8'>
      <h3 className='text-2xl font-bold mb-4'>Customer Reviews</h3>
      <div className='flex items-center mb-4'>
        <p className='text-lg font-bold'>Average Rating:</p>
        <div className='flex items-center ml-2'>
          {[1, 2, 3, 4, 5].map((index) => (
            <FaStar
              key={index}
              size={18}
              className={`${
                rating >= index ? "text-yellow-500" : "text-gray-300"
              } mx-1`}
            />
          ))}
          <span className='ml-2'>{rating}.0</span>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 overflow-x-hidden overflow-y-auto max-h-[400px]'>
        {reviews?.map((review) => (
          <div
            key={review._id}
            className='bg-white bg-opacity-5 p-4 rounded-lg shadow-md hover:shadow-xl'>
            <p className='font-semibold text-lg text-blue-700'>{review.name}</p>
            <div className='flex items-center'>
              {[1, 2, 3, 4, 5].map((index) => (
                <FaStar
                  key={index}
                  size={16}
                  className={`${
                    review.rating >= index ? "text-yellow-500" : "text-gray-300"
                  } mx-1`}
                />
              ))}
            </div>
            <p className='mt-2 text-gray-500'>{review.comment}</p>
          </div>
        ))}
      </div>
      <div className='mt-8'>
        <AddReview productId={_id} refetch={refetch} />
      </div>
    </div>
  );
}

export default Reviews;
