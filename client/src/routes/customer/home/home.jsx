/** @format */

import React from "react";
import Search from "../components/search";
import "./home.css";
import { Link } from "react-router-dom";
import Navbar from "@/routes/customer/components/nav";
import Footer from "../components/footer";
import TopProducts from "./TopProducts";
import NewProducts from "./NewProducts";
import Discount from "./Discount";
import Testimonial from "./Testimonial";

function home() {
  return (
    <>
      <Navbar />
      <div className='flex flex-col container'>
        <Search />
        <div className='hero h-[700px] w-[110vw] mt-[-130px] container ml-[-2rem]'></div>
        <div className='hero-cover h-[700px] w-[100vw] absolute top-0 pt-40 flex justify-center items-center flex-col gap-4 container ml-[-2rem]'>
          <h1 className='text-wrap text-center text-6xl'>
            Mordern Electronics, Best quality
          </h1>
          <h5 className='max-w-[35em] text-center text-lg'>
            Discover top-notch electronics for every need. Stay connected with
            our range of innovative gadgets and devices.
          </h5>
          <Link
            to='/shop'
            className='mt-6 px-6 py-2 bg-yellow-600 rounded-md text-lg text-black font-bold hover:bg-yellow-400'>
            Shop now!!
          </Link>
        </div>
        <NewProducts />
        <Discount />
        <TopProducts />
        <Testimonial />
        
      </div>
      <Footer />
    </>
  );
}

export default home;
