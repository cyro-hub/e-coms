/** @format */

import React from "react";

function Testimonial() {
  return (
    <section className='text-gray-700 body-font mb-10'>
      <div className='container px-5 pt-14 mx-auto'>
        <div className='flex flex-col text-center w-full mb-10'>
          <h1 className='sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900'>
            Testimonials
          </h1>
          <p className='lg:w-2/3 mx-auto leading-relaxed text-base'>
            See what our customers have to say about us.
          </p>
        </div>
      </div>
      <div className='flex flex-wrap -m-4'>
        <div className='p-4 md:w-1/3'>
          <div className='h-full rounded-lg overflow-hidden'>
            <img
              className='lg:h-48 md:h-36 w-full object-cover object-center'
              src='https://source.unsplash.com/720x400/?testimonial'
              alt='testimonial'
            />
            <div className='p-6'>
              <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                Chris Wiston
              </h2>
              <p className='leading-relaxed mb-3'>
                "I have been a satisfied customer of this store for a long time.
                The quality of products is exceptional, and the customer service
                is top-notch. I highly recommend this store to anyone looking
                for reliable electronics."
              </p>
              <a href='#' className='text-indigo-500 inline-flex items-center'>
                Read More
                <svg
                  className='w-4 h-4 ml-2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='M5 12h14'></path>
                  <path d='M12 5l7 7-7 7'></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className='p-4 md:w-1/3'>
          <div className='h-full rounded-lg overflow-hidden'>
            <img
              className='lg:h-48 md:h-36 w-full object-cover object-center'
              src='https://source.unsplash.com/721x401/?testimonial'
              alt='testimonial'
            />
            <div className='p-6'>
              <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                John Smith
              </h2>
              <p className='leading-relaxed mb-3'>
                "I have been a loyal customer of this store for years. The
                quality of products and the exceptional customer service keep me
                coming back. I highly recommend this store to anyone looking for
                top-notch electronics."
              </p>
              <a href='#' className='text-indigo-500 inline-flex items-center'>
                Read More
                <svg
                  className='w-4 h-4 ml-2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='M5 12h14'></path>
                  <path d='M12 5l7 7-7 7'></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className='p-4 md:w-1/3'>
          <div className='h-full rounded-lg overflow-hidden'>
            <img
              className='lg:h-48 md:h-36 w-full object-cover object-center'
              src='https://source.unsplash.com/722x402/?testimonial'
              alt='testimonial'
            />
            <div className='p-6'>
              <h2 className='tracking-widest text-xs title-font font-medium text-gray-400 mb-1'>
                Jane White
              </h2>
              <p className='leading-relaxed mb-3'>
                "I had an amazing experience shopping at this store. The
                customer service was exceptional, and the products exceeded my
                expectations. I will definitely be coming back for more!"
              </p>
              <a href='#' className='text-indigo-500 inline-flex items-center'>
                Read More
                <svg
                  className='w-4 h-4 ml-2'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth='2'
                  fill='none'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='M5 12h14'></path>
                  <path d='M12 5l7 7-7 7'></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonial;
