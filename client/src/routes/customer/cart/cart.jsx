/** @format */

import React, { useEffect, useState } from "react";
import Nav from "@/routes/customer/home/components/nav";
import { handleGetCart } from "@/utils/utils";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/footer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CartItem } from "./CartItem";
import Promocode from "./Promocode";
import { defaultFallbackInView } from "react-intersection-observer";
import { toast } from "sonner";
import { FaCcPaypal, FaPaypal } from "react-icons/fa";
import knetLogo from "../../../assets/knetlogo.png";

const FormSchema = z.object({
  // shippingPrice: z.number(),
  shippingPrice: z.string(),
  paymentMethod: z.string(),
  // .transform((str) => {
  //   return parseFloat(str);
  // })
  // .refine((num) => !isNaN(num), {
  //   message: "Value must be a valid number",
  // }),
});

export default function cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    const cartData = handleGetCart();
    setCartItems(cartData);
  }, []);

  const checkScreenSize = () => setScreenSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  });

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      shippingPrice: "2.5",
      paymentMethod: "paypal",
    },
  });

  function onSubmit() {
    const { shippingPrice, paymentMethod } = form.getValues();
    if (isNaN(shippingPrice)) {
      toast(`shipping price is not set`, {
        description: moment().format("LLLL"),
      });
      return;
    }

    navigate("/checkout", {
      state: {
        shippingPrice: parseFloat(shippingPrice),
        paymentMethod,
        orderItems: handleGetCart(),
      },
    });
  }
  //
  return (
    <>
      <Nav />
      <div className='container mx-auto mt-10 px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row shadow-md my-10'>
          <div className='w-full md:w-3/4 bg-[#ffffff10] rounded-md px-4 py-10 overflow-auto max-h-[80vh] relative no-scrollbar sm:px-6 lg:px-10'>
            <div className='flex justify-between border-b pb-8'>
              <h1 className='font-semibold text-xl sm:text-2xl'>Cart</h1>
              <h2 className='font-semibold text-xl sm:text-2xl'>
                {cartItems.length > 1
                  ? `${cartItems.length} Items`
                  : `${cartItems.length} Item`}
              </h2>
            </div>
            {screenSize > 700 && (
              <div
                className='mt-10 mb-5'
                style={{ whiteSpace: "nowrap", overflowX: "auto" }}>
                <h3 className='font-semibold text-gray-600 text-xs uppercase inline-block w-full sm:w-2/5'>
                  Product Details
                </h3>
                <h3 className='font-semibold text-center text-gray-600 text-xs uppercase inline-block w-full sm:w-1/5'>
                  Quantity
                </h3>
                <h3 className='font-semibold text-center text-gray-600 text-xs uppercase inline-block w-full sm:w-1/5'>
                  Price
                </h3>
                <h3 className='font-semibold text-center text-gray-600 text-xs uppercase inline-block w-full sm:w-1/5'>
                  Total
                </h3>
              </div>
            )}
            <div
              style={{
                whiteSpace: "nowrap",
                overflowX: "auto",
                maxWidth: "100%",
              }}>
              {cartItems?.map((item, index) => (
                <CartItem
                  {...item}
                  setCartItems={setCartItems}
                  key={index}
                  style={{ display: "inline-block" }}
                />
              ))}
            </div>
          </div>
          <div id='summary' className='w-full md:w-1/4 px-4 py-10 sm:px-8'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-6 border-b pb-4 mb-2'>
                {/* <h1 className='font-semibold text-xl sm:text-2xl border-b pb-8'>
                  Order Summary
                </h1> */}
                <div className='flex font-semibold justify-between py-2 text-md border-b pb-8 uppercase'>
                  <span>Total cost</span>
                  <span>
                    {(
                      cartItems.reduce(
                        (acc, item) =>
                          item.qty *
                            (item.price -
                              (item.discount > 0 &&
                                (item.discount / 100) * item.price)) +
                          acc,
                        0
                      ) + Number(form.getValues().shippingPrice)
                    ).toFixed(3)}{" "}
                    kd
                  </span>
                </div>
                <FormField
                  control={form.control}
                  name='shippingPrice'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a shipping option' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"2.5"}>
                            Standard Shipping 2.5kd
                          </SelectItem>
                          <SelectItem value={"5"}>
                            Express Shipping 5kd
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Shipping option</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='paymentMethod'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a payment method' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value={"paypal"}>
                            <span className='flex flex-row gap-2 items-center'>
                              <FaPaypal size={16} />
                              paypay
                            </span>
                          </SelectItem>
                          <SelectItem value={"knet"}>
                            <span className='flex flex-row gap-2 items-center'>
                              <img
                                src={knetLogo}
                                alt='knet logo'
                                className='w-4 h-4'
                              />
                              knet
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>payment method</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
            <Promocode />
            <div className='border-t mt-8'>
              <button
                onClick={onSubmit}
                // type='submit'
                className='rounded-md font-semibold bg-blue-500 hover:bg-blue-700 py-3 text-sm text-white uppercase w-full'>
                Checkout
              </button>
              <Link
                to='/shop'
                className='flex font-semibold text-indigo-600 text-sm mt-10'>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
