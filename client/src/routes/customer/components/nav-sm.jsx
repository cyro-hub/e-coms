/** @format */

import React, { useEffect, useState } from "react";
import { BsExclamationLg } from "react-icons/bs";
import { FaOpencart, FaShopify } from "react-icons/fa";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

function navsm() {
  const [size, setSize] = useState(window.innerWidth);
  const windowSizeChecker = () => setSize(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", windowSizeChecker);

    return () => window.removeEventListener("resize", windowSizeChecker);
  });
  return (
    <div className='w-full container text-white py-4 px-8 flex justify-between items-center'>
      <Link to='/' className='z-50 text-2xl font-bold hover:text-gray-400'>
        <img src={logo} alt='site logo' className='w-16 h-10' />
      </Link>
      {size > 750 && (
        <div className='flex items-center'>
          <Link
            to='/shop'
            className='flex justify-center items-center mr-6 hover:text-gray-400'>
            <FaShopify className='mr-1' />
            Shop
          </Link>
          <Link
            to='/cart'
            className='flex justify-center items-center mr-6 hover:text-gray-400'>
            <FaOpencart className='mr-1' />
            Cart
          </Link>
        </div>
      )}
    </div>
  );
}

export default navsm;
