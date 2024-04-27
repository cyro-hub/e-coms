/** @format */

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { LiaFilterSolid } from "react-icons/lia";
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
import CheckBoxesFilter from "@/routes/customer/components/categoryCheckBox";
import PriceFilter from "@/routes/customer/components/priceCheckBox";
import { priceFilterList } from "@/routes/customer/components/priceList";
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

function HamburgerFilterMenu({ refetch }) {
  const [size, setSize] = useState(window.innerWidth);
  const { filters } = useSelector((state) => state.productState);
  const dispatch = useDispatch();

  const windowSizeChecker = () => setSize(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", windowSizeChecker);

    return () => window.removeEventListener("resize", windowSizeChecker);
  });

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
    form.reset();
    // console.log("hello")
    refetch();
  }

  return (
    <Sheet>
      {size < 500 && (
        <SheetTrigger>
          <LiaFilterSolid size={30} className='absolute top-4 right-4' />
        </SheetTrigger>
      )}
      <SheetContent>
        <div className='nav-content flex flex-col items-center my-8 gap-2 text-[#ffffff50]text-slate-950 h-[100vh] overflow-auto pb-10'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='h-[100%] mt-auto flex flex-col py-2 gap-6 no-scrollbar overflow-auto relative rounded-sm pb-10'>
              <CheckBoxesFilter form={form} />
              <PriceFilter form={form} />
              <div className='flex justify-between gap-4 items-center fixed bottom-2'>
                <SheetClose asChild>
                  <Button type='submit'>Apply</Button>
                </SheetClose>
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
      </SheetContent>
    </Sheet>
  );
}

export default HamburgerFilterMenu;
