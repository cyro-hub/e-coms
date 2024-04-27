/** @format */

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export const promoCodeFormSchema = z.object({
  promoCode: z
    .string()
    .min(4, {
      message: "Invalid promo code",
    })
    .max(4, {
      message: "Invalid promo code",
    }),
});

function Promocode() {
  const promoForm = useForm({
    resolver: zodResolver(promoCodeFormSchema),
    defaultValues: {
      promoCode: "",
    },
  });
  function applyPromoCode(data) {
    console.log(data);
  }
  return (
    <div className='py-2'>
      <Form {...promoForm}>
        <form
          onSubmit={promoForm.handleSubmit(applyPromoCode)}
          className='space-y-2'>
          <FormField
            control={promoForm.control}
            name='promoCode'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Promo code' {...field} />
                </FormControl>
                <FormDescription>Enter promo code</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type='submit'
            className='bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
            Apply
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Promocode;
