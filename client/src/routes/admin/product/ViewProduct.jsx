/** @format */

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ImSearch } from "react-icons/im";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/api/product";
import ProductDetail from "./productDetail";
import Navbar from "../component/nav";
import moment from "moment";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { useParams } from "react-router-dom";
import { FaPhotoVideo } from "react-icons/fa";

function viewProduct() {
  const { id } = useParams();
  const { data, error, isFetching, status } = useQuery({
    queryKey: ["product", { id }],
    queryFn: getProductById,
  });

  if (!data || !data.product) {
    return (
      <div className='container flex gap-4 justify-center items-center h-[100vh]'>
        <div className='flex flex-col gap-4 py-4 overflow-auto no-scrollbar'>
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className='grid grid-cols-4 justify-center items-center gap-4 animate-pulse'>
              <span className='text-right italic text-xs col-span-1 bg-gray-300 rounded w-8'>
                Name
              </span>
              <div className='col-span-3 bg-gray-300 h-4 rounded w-8'>sdaf</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const {
    name,
    brand,
    createdAt,
    updatedAt,
    description,
    quantity,
    price,
    images,
    category,
  } = data?.product;

  return (
    <>
      <Navbar />
      <div className='container flex gap-4 justify-center items-center h-[100vh]'>
        <div className='flex flex-col gap-4 py-4 overflow-auto no-scrollbar justify-center'>
          <div className='grid grid-cols-4 justify-center items-center gap-4'>
            <span className='text-right italic text-xs'>Name</span>
            <div className='col-span-3'>{name}</div>
          </div>
          <div className='grid grid-cols-4 justify-center items-center gap-4'>
            <span className='text-right italic text-xs'>Brand</span>
            <div className='col-span-3'>{brand?.name}</div>
          </div>
          <div className='grid grid-cols-4 justify-center items-center gap-4'>
            <span className='text-right italic text-xs'>Category</span>
            <div className='col-span-3'>{category?.name}</div>
          </div>
          <div className='grid grid-cols-4 justify-center items-center gap-4'>
            <span className='text-right italic text-xs'>Price</span>
            <div className='col-span-3'>{`${price}kwd`}</div>
          </div>
          <div className='grid grid-cols-4 justify-center items-center gap-4'>
            <span className='text-right italic text-xs'>Quantity</span>
            <div className='col-span-3'>{`${quantity} pcs`}</div>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <span className='text-right italic text-xs'>Description</span>
            <div className='col-span-3'>{description}</div>
          </div>
          <div className='grid grid-cols-4 justify-center items-center gap-4'>
            <span className='text-right italic text-xs'>Created At</span>
            <div className='col-span-3'>{moment(createdAt).format("LLLL")}</div>
          </div>
          <div className='grid grid-cols-4 justify-center items-center gap-4'>
            <span className='text-right italic text-xs'>Updated At</span>
            <div className='col-span-3'>{moment(updatedAt).format("LLLL")}</div>
          </div>
          <div className='grid grid-cols-4 gap-4'>
            <ProductImages images={images} />
          </div>
        </div>
      </div>
    </>
  );
}

function ProductImages({ images }) {
  const [isOpen, setIsOpen] = useState(false);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      {/* <span className='text-right italic text-xs' onClick={openModal}>
        images
      </span> */}
      <div className='col-span-3 border text-center rounded-md py-2 ' onClick={openModal}>
        view product images
      </div>
      <Dialog open={isOpen} onClose={closeModal} className='relative z-50'>
        <div className='fixed inset-0' aria-hidden='true' />
        <div className='fixed inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel className='mx-auto md:w-[700px] sm:w-[98vw] h-[500px] rounded bg-transparent p-2 px-4'>
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
                      <img
                        src={image}
                        alt={image}
                        className='rounded-md w-[100%] max-h-[500px]'
                      />
                    </SwiperSlide>
                  ))}
            </Swiper>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default viewProduct;
