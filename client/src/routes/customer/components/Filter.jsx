/** @format */

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CheckBoxesFilter from "./categoryCheckBox";
import PriceFilter from "./priceCheckBox";
import { priceFilterList } from "./priceList";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FcClearFilters } from "react-icons/fc";

const FormSchema = z.object({
  checked: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
  radio: z.array(z.number()),
});

function Filter({ refetch }) {
  const [size, setSize] = useState(window.innerWidth);
  const { filters } = useSelector((state) => state.productState);
  const dispatch = useDispatch();

  const windowSizeChecker = () => setSize(window.innerWidth);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      checked: filters?.checked || [],
      radio: filters?.radio || priceFilterList[0].value,
    },
  });

  function onSubmit(values) {
    // console.log(values);
    dispatch({
      type: "product/setFilters",
      payload: values,
    });
    refetch();
  }

  function handleClearFilters() {
    dispatch({
      type: "product/setFilters",
      payload: null,
    });
    // refetch();
  }

  useEffect(() => {
    window.addEventListener("resize", windowSizeChecker);

    return () => window.removeEventListener("resize", windowSizeChecker);
  });
  return (
    <>
      {size > 500 && (
        <div className='fixed top-0 flex-none w-[220px] py-6 no-scrollbar'>
          <div className='flex flex-col items-center h-[94vh] overflow-auto justify-center w-full no-scrollbar mt-10'>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='h-[100%] mt-auto flex flex-col py-2 gap-6 no-scrollbar overflow-auto relative rounded-sm pb-10'>
                <CheckBoxesFilter form={form} />
                <PriceFilter form={form} />
                <div className='flex justify-between gap-4 items-center fixed bottom-2'>
                  <Button type='submit'>Apply</Button>
                  <Button
                    type='button'
                    onClick={handleClearFilters}
                    className='bg-transparent'>
                    <FcClearFilters size={18} />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      )}
    </>
  );
}

export default Filter;
