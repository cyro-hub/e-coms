/** @format */

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function footer() {
  return (
    <footer className='bg-gray-800 text-white p-6 w-[100vw]'>
      <div className='container mx-auto flex flex-wrap justify-between items-center'>
        <div className='w-full md:w-1/3 mb-6 md:mb-0'>
          <h2 className='text-xl font-bold'>ElectroMart</h2>
          <p className='mt-2 text-gray-400'>
            Your one-stop shop for the latest and greatest in electronics. From
            smartphones to laptops, we've got it all.
          </p>
        </div>
        <div className='w-full md:w-1/3 mb-6 md:mb-0'>
          <h3 className='text-lg font-semibold'>Quick Links</h3>
          <ul className='mt-2'>
            <li>
              <a href='#' className='text-gray-400 hover:text-white'>
                Home
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-400 hover:text-white'>
                Shop
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-400 hover:text-white'>
                About Us
              </a>
            </li>
            <li>
              <a href='#' className='text-gray-400 hover:text-white'>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className='w-full md:w-1/3 mb-6 md:mb-0'>
          <h3 className='text-lg font-semibold'>Follow Us</h3>
          <div className='flex mt-2'>
            <a href='#' className='mr-4 text-gray-400 hover:text-white'>
              <FaFacebookF />
            </a>
            <a href='#' className='mr-4 text-gray-400 hover:text-white'>
              <FaTwitter />
            </a>
            <a href='#' className='mr-4 text-gray-400 hover:text-white'>
              <FaInstagram />
            </a>
            <a href='#' className='text-gray-400 hover:text-white'>
              <FaLinkedinIn />
            </a>
          </div>
        </div>
      </div>
      <div className='text-center text-gray-400 mt-6'>
        © 2024 ElectroMart. All rights reserved.
      </div>
    </footer>
  );
}

export default footer;
