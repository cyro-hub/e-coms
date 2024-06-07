/** @format */

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { FaOpencart, FaShopify } from "react-icons/fa";
import Filters from "./Filters";
import { BiSolidLock } from "react-icons/bi";
import Search from "@/routes/customer/components/Search";

function Nav() {
  const customer = useSelector((state) => state.userState.user);
  const location = useLocation();
  const [isHome, setIsHome] = useState(
    location.pathname === "/" ? true : false
  );
  const [isShop, setIsShop] = useState(
    location.pathname === "/shop" ? true : false
  );

  const navigate = useNavigate();

  function onSubmit(values) {
    if (values.query) {
      closeSheetOnFormSubmit.current.click();
      navigate(`/shop/${values.query}`);
    }
  }

  return (
    <div className='container flex flex-col'>
      <div className='z-50 relative flex flex-row basis-1/3 justify-between items-center py-2 nav-customer'>
        <Link to='/' className='text-2xl font-bold hover:text-gray-400'>
          <img src={logo} alt='site logo' className='w-14 h-10' />
        </Link>
        <div className='flex gap-4 justify-center items-center'>
          <Link to=''>
            <Search />
          </Link>
          <Link to='/cart'>
            <FaOpencart size={22} />
          </Link>
          {isHome ? (
            <>
              {customer?.name ? (
                <Link to='/profile'>
                  {getFirstLettersCapitalized(customer?.name)}
                </Link>
              ) : (
                <Link to='/auth'>
                  <BiSolidLock size={22} />
                </Link>
              )}
            </>
          ) : (
            // <BiSolidLock />
            <>
              {isShop ? (
                <Filters />
              ) : (
                <Link to='/shop'>
                  <FaShopify className='mr-2' />
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      <div className=''>
        {isHome ||
          (isShop && (
            <ul className='flex space-x-2 bg-[#ffffff05] text-white p-1 rounded-lg overflow-x-auto no-scrollbar'>
              <li className='hover:bg-[#0f1936] py-1 px-2 rounded text-sm'>
                Electronics
              </li>
              <li className='hover:bg-[#0f1936] py-1 px-2 rounded text-sm'>
                Apparel
              </li>
              <li className='hover:bg-[#0f1936] py-1 px-2 rounded text-sm text-nowrap'>
                Home Essentials
              </li>
              <li className='hover:bg-[#0f1936] py-1 px-2 rounded text-sm'>
                Books
              </li>
            </ul>
          ))}
      </div>
    </div>
  );
}

export default Nav;

function getFirstLettersCapitalized(str) {
  // Split the string into an array of words
  const words = str.split(" ");

  // Map over the array of words and capitalize the first letter of each word
  const firstLettersCapitalized = words.map((word) => {
    // Check if the word is not empty
    if (word.length > 0) {
      // Capitalize the first letter and concatenate the rest of the word
      return word[0].toUpperCase();
    } else {
      // Return empty string for empty words
      return "";
    }
  });

  // Join the capitalized first letters into a single string
  const firstLettersStrCapitalized = firstLettersCapitalized.join("");

  return firstLettersStrCapitalized;
}
