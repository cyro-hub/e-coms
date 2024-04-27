/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiSolidLock } from "react-icons/bi";
import { MdHome } from "react-icons/md";
import { BiCategory, BiSolidShoppingBag, BiSolidContact } from "react-icons/bi";
import { RiLogoutBoxLine } from "react-icons/ri";
import { FaSearch, FaShopify, FaOpencart } from "react-icons/fa";
import { IoMdHelp } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa6";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
  NavigationMenuTriggerNoChevronDown,
  NavigationMenuTriggerNoChevronDownNoBackground,
  ListItem,
  SideBarListItem,
} from "@/components/ui/navigation-menu";
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
    <div className='container z-50 relative flex flex-row basis-1/3 justify-between items-baseline py-2 nav-customer'>
      <Link to='/' className='text-2xl font-bold hover:text-gray-400'>
        <img src={logo} alt='site logo' className="w-16 h-10" />
      </Link>
      {size > 750 && (
        <div className='flex flex-row gap-5'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to='/shop'>
                  <NavigationMenuTriggerNoChevronDown>
                    <FaShopify className='mr-2' />
                    Shop
                  </NavigationMenuTriggerNoChevronDown>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  <BiCategory className='mr-2' />
                  Categories
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] '>
                    {categories.map((category) => (
                      <ListItem
                        key={category.name}
                        onClick={() => handleClickCategory(category)}
                        to={``}>
                        <div className='max-w-xs rounded overflow-hidden shadow-lg flex justify-center items-baseline'>
                          <img
                            className='w-[80px]'
                            src={category.thumbnail}
                            alt={category.name}
                          />
                          <div className='px-6 py-4'>
                            <div className='font-bold text-xl mb-2'>
                              {category.name}
                            </div>
                          </div>
                        </div>
                      </ListItem>
                    ))}
                    <ListItem key={Math.random(5)} to={"/shop"}>
                      See more...
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to='/shop'>
                  <NavigationMenuTriggerNoChevronDown>
                    <BiSolidShoppingBag className='mr-2' />
                    Wishlist
                  </NavigationMenuTriggerNoChevronDown>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
      <Sheet>
        {size > 750 ? (
          <div className='flex gap-4'>
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
        ) : (
          <SheetTrigger>
            <BiCategory size={22} />
          </SheetTrigger>
        )}
        <SheetContent>
          <div className='nav-content flex flex-col items-center my-8 gap-2 text-[#ffffff50]text-slate-950 w-full'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
                <FormField
                  control={form.control}
                  name='query'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder='search' type='search' {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <SheetClose asChild>
                  <button className='hidden' ref={closeSheetOnFormSubmit}>
                    close
                  </button>
                </SheetClose>
              </form>
            </Form>
            <SheetClose asChild>
              <SideBarListItem to={"cart"}>
                <FaCartArrowDown size={13} className='mr-2' />
                cart
              </SideBarListItem>
            </SheetClose>
            <SheetClose asChild>
              <SideBarListItem to={"support"}>
                <IoMdHelp size={13} className='mr-2' />
                support
              </SideBarListItem>
            </SheetClose>
            <SheetClose asChild>
              <SideBarListItem to={"contact"}>
                <BiSolidContact size={13} className='mr-2' />
                contact
              </SideBarListItem>
            </SheetClose>
            <SheetClose asChild>
              <SideBarListItem to={"auth"}>
                <BiSolidLock size={13} className='mr-2' />
                login
              </SideBarListItem>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
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
