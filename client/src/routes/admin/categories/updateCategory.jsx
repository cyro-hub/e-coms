/** @format */

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { userAuth } from "@/api/customer";
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
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../redux/features/categorySlice/category";

const formSchema = z.object({
  name: z.string().min(8, {
    message: "name must be at least 8 characters.",
  }),
});

export default function UpdateCategory({ category }) {
  const { name, _id } = category;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);

      const { category, message, success } = await fetch("/api/category", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          categoryId: _id,
        }),
      }).then((res) => res.json());

      if (success) {
        form.reset();
        dispatch(getCategories());
      }
      setMessage(message);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Update Category</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-[#000514]'>
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Update category here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <p className='w-full text-center text-[#ffffff80]'>{message}</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 min-w-[250px] max-w-[420px] rounded-[10px] py-6 px-4 pt-10'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type='text' placeholder='name' {...field} />
                    </FormControl>
                    {form.formState.errors.name ? (
                      <FormMessage />
                    ) : form.getValues().name === "" ? (
                      <p className='h-5'></p>
                    ) : (
                      <FormDescription>Enter the category.</FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className='w-full flex justify-center items-center flex-col space-y-2'>
                  {isLoading ? (
                    <Button className='bg-[#0a4203]' disabled>
                      <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                      Please wait
                    </Button>
                  ) : (
                    <Button className='bg-[#0a4203] w-[70%]' type='submit'>
                      save
                    </Button>
                  )}
                  <Outlet />
                </div>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
