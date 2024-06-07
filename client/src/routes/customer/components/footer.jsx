/** @format */

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

function footer() {
  return (
    <footer className='bg-gray-800 text-white p-6 w-[100vw]'>
      <div className='container mx-auto flex flex-wrap justify-between items-center'>
        <div className='w-full md:w-1/3 mb-6 md:mb-0'>
          <img src={logo} alt='the website logo' className='w-20 h-14' />
          <p className='mt-2 text-gray-400'>
            Your one-stop shop for the latest and greatest in electronics. From
            smartphones to laptops, we've got it all.
          </p>
        </div>
        <div className='w-full md:w-1/3 mb-6 md:mb-0'>
          <h3 className='text-lg font-semibold'>Quick Links</h3>
          <ul className='mt-2'>
            <li>
              <Link to='/' className='text-gray-400 hover:text-white'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/shop' className='text-gray-400 hover:text-white'>
                Shop
              </Link>
            </li>
            <li>
              <Link to='/about' className='text-gray-400 hover:text-white'>
                About Us
              </Link>
            </li>
            <li>
              <Link to='/contact' className='text-gray-400 hover:text-white'>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className='w-full md:w-1/3 mb-6 md:mb-0'>
          <h3 className='text-lg font-semibold'>Follow Us</h3>
          <div className='flex mt-2'>
            <Link to='#' className='mr-4 text-gray-400 hover:text-white'>
              <FaFacebookF />
            </Link>
            <Link to='#' className='mr-4 text-gray-400 hover:text-white'>
              <FaTwitter />
            </Link>
            <Link to='#' className='mr-4 text-gray-400 hover:text-white'>
              <FaInstagram />
            </Link>
            <Link to='#' className='text-gray-400 hover:text-white'>
              <FaLinkedinIn />
            </Link>
          </div>
        </div>
      </div>
      <div className='text-center text-gray-400 mt-6'>
        © {new Date().getFullYear()} Bong'sco. All rights reserved.
      </div>
    </footer>
  );
}

export default footer;
