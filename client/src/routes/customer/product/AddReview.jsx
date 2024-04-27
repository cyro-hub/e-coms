/** @format */

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { FaShopify, FaStar } from "react-icons/fa";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useMutation } from "@tanstack/react-query";
import { addProductReview } from "@/api/product";

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9",
};

const FormSchema = z.object({
  comment: z
    .string()
    .min(10, {
      message: "comment must be at least 10 characters.",
    })
    .max(160, {
      message: "comment must not be longer than 30 characters.",
    }),
});

export default function AddReview({ productId, refetch }) {
  const [hoverValue, setHoverValue] = useState(undefined);
  const [currentValue, setCurrentValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  });

  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const onSubmit = async (values) => {
    setIsLoading(true);
    values.rating = currentValue;
    values.productId = productId;

    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: addProductReview,
    onSuccess: ({ message, success, product }) => {
      setIsLoading(false);
      if (!success) {
        // setMessage(message);
        return;
      }
      form.reset();
      setCurrentValue(0);
      refetch();
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-6'>
        <div className='flex flex-col'>
          <span>Rating</span>
          <span className='flex mt-2'>
            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  onMouseOver={() => handleMouseOver(index + 1)}
                  onMouseLeave={handleMouseLeave}
                  color={
                    (hoverValue || currentValue) > index
                      ? colors.orange
                      : colors.grey
                  }
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
          </span>
        </div>
        <FormField
          control={form.control}
          name='comment'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder='Write down your comment'
                  className='resize-none'
                  {...field}
                />
              </FormControl>
              {form.formState.errors.comment ? (
                <FormMessage />
              ) : form.getValues().comment === "" ? (
                <p className='h-5'></p>
              ) : (
                <FormDescription>Enter your comment.</FormDescription>
              )}
            </FormItem>
          )}
        />
        <div className='w-full flex justify-center items-center flex-col mt-[-20px]'>
          {isLoading ? (
            <Button className='bg-[#0a4203]' disabled>
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button className='bg-[#0a4203] w-[70%]' type='submit'>
              submit review
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
