/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidLock } from "react-icons/bi";
// import { MdHome } from "react-icons/md";
import { BiCategory, BiSolidShoppingBag, BiSolidContact } from "react-icons/bi";
// import { RiLogoutBoxLine } from "react-icons/ri";
import { FaSearch, FaShopify, FaOpencart } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa6";
// import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { SideBarListItem } from "@/components/ui/navigation-menu";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from "react-redux";
import logo from "@/assets/logo.png";
import Search from "@/routes/customer/components/Search";

const searchSchema = z.object({
  query: z.string(),
});

function Nav() {
  const [size, setSize] = useState(window.innerWidth);
  const dispatch = useDispatch();

  const customer = useSelector((state) => state.userState.user);
  const { categories } = useSelector((state) => state.categoryState);

  const windowSizeChecker = () => setSize(window.innerWidth);

  const handleClickCategory = (category) => {
    const filter = {
      checked: [category._id],
      radio: [0, 1000],
    };

    dispatch({
      type: "product/setFilters",
      payload: filter,
    });

    navigate("/shop");
  };

  const closeSheetOnFormSubmit = useRef(null);

  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(values) {
    if (values.query) {
      closeSheetOnFormSubmit.current.click();
      navigate(`/shop/${values.query}`);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", windowSizeChecker);

    return () => window.removeEventListener("resize", windowSizeChecker);
  });

  return (
    <div className='container flex flex-col'>
      <div className='z-50 relative flex flex-row basis-1/3 justify-between items-center py-2 nav-customer'>
        <Link to='/' className='text-2xl font-bold hover:text-gray-400'>
          <img src={logo} alt='site logo' className='w-14 h-10' />
        </Link>
        {size > 750 && (
          <div className='flex flex-row gap-5'>
            <Link to='/about' className='font-bold text-sm'>
              About
            </Link>
            <Link to='/support' className='font-bold text-sm'>
              Support
            </Link>
            <Link to='/policies' className='font-bold text-sm'>
              Policies
            </Link>
          </div>
        )}
        <div className='flex gap-4'>
          <Link to='/'>
            <Search />
          </Link>
          <Link to='/cart'>
            <FaOpencart size={22} />
          </Link>
          {customer?.name ? (
            <Link to='/profile'>
              {getFirstLettersCapitalized(customer?.name)}
            </Link>
          ) : (
            <Link to='/auth'>
              <BiSolidLock size={22} />
            </Link>
          )}
        </div>
      </div>
      <div className='z-50'>
        <ul className='flex space-x-2 bg-[#ffffff10] text-white p-1 rounded-lg overflow-x-auto no-scrollbar'>
          <li className='hover:bg-[#ffffff20] py-1 px-2 rounded text-sm'>
            Electronics
          </li>
          <li className='hover:bg-[#ffffff20] py-1 px-2 rounded text-sm text-nowrap'>
            Apparel
          </li>
          <li className='hover:bg-[#ffffff20] py-1 px-2 rounded text-sm text-nowrap'>
            Home Essentials
          </li>
          <li className='hover:bg-[#ffffff20] py-1 px-2 rounded text-sm text-nowrap'>
            Books
          </li>
          <li className='hover:bg-[#ffffff20] py-1 px-2 rounded text-sm text-nowrap'>
            See more...
          </li>
        </ul>
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
