/** @format */

import React from "react";
import "./home.css";
import { Link } from "react-router-dom";
import Navbar from "@/routes/customer/home/components/nav";
import Footer from "../components/footer";
import TopProducts from "./components/TopProducts";
import NewProducts from "./components/NewProducts";
import Discount from "./Discount";
import Testimonial from "./components/Testimonial";

function home() {
  return (
    <>
      <Navbar />
      <div className='flex flex-col container'>
        <div className='hero h-[700px] w-[100vw] absolute top-0 left-0 right-0 flex justify-center items-center'></div>
        <div className='hero-cover h-[700px] w-[100vw] absolute top-0 left-0 pt-40 flex justify-center items-center flex-col gap-4'>
          <h1 className='text-wrap text-center text-6xl'>
            Modern Electronics, Best quality
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
