import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch } from "react-redux";

const searchSchema = z.object({
  query: z.string(),
});

function search() {
  const [size, setSize] = useState(window.innerWidth);
  const dispatch = useDispatch();

  const windowSizeChecker = () => setSize(window.innerWidth);
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      query: "",
    },
  });

  function onSubmit(values) {
    if (values.query) {
      dispatch({
        type: "product/setFilters",
        payload: null,
      });
      navigate(`/shop/${values.query}`);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", windowSizeChecker);

    return () => window.removeEventListener("resize", windowSizeChecker);
  });
  return (
    <div className="flex w-full z-40 top-14 justify-center items-center mt-8 sticky">
      {size > 750 && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-[600px]">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="search" type="search" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      )}
    </div>
  );
}

export default search;
