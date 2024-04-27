/** @format */

import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ProductImages({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className=''>
        {!images
          ? Array.from({ length: 10 }).map((imageSkeleton, index) => (
              <SwiperSlide key={index}>
                <div className='animate-pulse flex flex-col justify-center items-center space-x-4 gap-2 w-[400px]'>
                  <div className='w-[100%] h-400px] rounded-md bg-gray-400'></div>
                </div>
              </SwiperSlide>
            ))
          : images.map((image) => (
              <SwiperSlide key={image}>
                <img src={image} alt={image} className='rounded-md' />
              </SwiperSlide>
            ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className='mt-4'>
        {!images
          ? Array.from({ length: 10 }).map((imageSkeleton, index) => (
              <SwiperSlide key={index}>
                <div className='animate-pulse flex flex-col justify-center items-center space-x-4 gap-2 w-[400px]'>
                  <div className='w-[100%] h-400px] rounded-md bg-gray-400'></div>
                </div>
              </SwiperSlide>
            ))
          : images.map((image) => (
              <SwiperSlide key={image}>
                <img src={image} alt={image} className='rounded-md' />
              </SwiperSlide>
            ))}
      </Swiper>
    </>
  );
}
