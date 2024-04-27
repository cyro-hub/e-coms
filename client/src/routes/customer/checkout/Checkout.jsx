/** @format */

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Nav from "../components/nav-sm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import areas from "@/utils/areas";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/order";
import { toast } from "sonner";
import moment from "moment";

const formSchema = z.object({
  governorate: z.string(),
  city: z.string(),
  block: z.number(),
  street: z.number(),
  building: z.number(),
  flatNumber: z.number(),
});

function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      governorate: areas[0]?.title.en,
      city: areas[0]?.areas[0].en,
      block: 1,
      street: 1,
      building: 1,
      flatNumber: 1,
    },
  });

  function onSubmit(data) {
    if (!state) {
      navigate("/cart");
    }
    // console.log(data);
    mutation.mutate({ ...state, shippingAddress: data });
  }

  const mutation = useMutation({
    mutationFn: createOrder,
    onSuccess: ({ message, success, order }) => {
      if (success) {
        form.reset();
        toast(message, {
          description: moment().format("LLLL"),
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return;
      }
      setMessage(message);
      setIsLoading(false);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const newCity = areas
      .filter((area) => area.title.en == form.getValues().governorate)[0]
      .areas[0].en.toString();

    form.setValue("city", newCity);
  }, [form.getValues().governorate]);

  return (
    <>
      <Nav />
      <div className='container mx-auto mt-10 px-4 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold text-center my-4'>Checkout</h2>
        <p className='text-orange-600'>{message}</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:w-[500px] flex flex-col gap-2 mx-auto pb-4'>
            <FormField
              control={form.control}
              name='governorate'
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Select Governorate.</FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select governorate' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areas?.map(({ title: governorate }) => (
                        <SelectItem value={governorate.en} key={governorate.en}>
                          {governorate.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='city'
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Select city.</FormDescription>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select city' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {areas
                        .filter(
                          (area) =>
                            area.title.en == form.getValues().governorate
                        )[0]
                        .areas.map(({ en: area }) => (
                          <SelectItem value={area} key={area}>
                            {area}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='block'
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Block number.</FormDescription>
                  <FormControl>
                    <Input placeholder='block' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='street'
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Street number.</FormDescription>
                  <FormControl>
                    <Input placeholder='street' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='building'
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Building number.</FormDescription>
                  <FormControl>
                    <Input placeholder='build no' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='flatNumber'
              render={({ field }) => (
                <FormItem>
                  <FormDescription>Flat number.</FormDescription>
                  <FormControl>
                    <Input placeholder='Flat number' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='w-full flex justify-between items-center flex-col my-4 space-y-2'>
              {isLoading ? (
                <Button className='bg-[#0a4203]' disabled>
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </Button>
              ) : (
                <Button className='bg-[#0a4203] w-[70%]' type='submit'>
                  submit
                </Button>
              )}
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}

export default Checkout;
