/** @format */

import React, { useRef, useEffect } from "react";
import discount1 from "../../../assets/discount1.jpg";
import discount2 from "../../../assets/discount2.jpg";

function Discount() {
  const imageRef = useRef(null);
  const divRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    const div = divRef.current;

    if (image && div) {
      const imageHeight = window.getComputedStyle(image).height;
      div.style.height = imageHeight;
    }
  }, []);

  return (
    <div className='sm:flex-wrap flex flex-wrap md:flex-nowrap justify-center items-center gap-4 my-8'>
      <a href='/discount1' className='w-full md:w-1/2 relative'>
        <img
          //   ref={imageRef}
          src={discount1}
          alt='Discount 1'
          className='w-full h-auto  rounded-md'
        />
        <div
          //   ref={divRef}
          className='absolute inset-0 bg-black opacity-50 hover:opacity-10  rounded-md transition-all ease-in-out duration-400'></div>
      </a>
      <a href='/discount2' className='w-full md:w-1/2 relative'>
        <img
          src={discount2}
          alt='Discount 2'
          className='w-full h-auto  rounded-md'
        />
        <div
          //   ref={divRef}
          className='absolute inset-0 bg-black opacity-50  hover:opacity-10  rounded-md transition-all ease-in-out duration-400'></div>
      </a>
    </div>
  );
}

export default Discount;
