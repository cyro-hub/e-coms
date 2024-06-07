/** @format */

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Link,
  useNavigate,
  Outlet,
  useLocation,
  useParams,
} from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { getBrands } from "../../../redux/features/brandSlice/brand";
import Navbar from "../component/nav";
import { updateBrand } from "@/api/brand";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  name: z.string().min(8, {
    message: "name must be at least 8 characters.",
  }),
});

export default function UpdateBrand() {
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id, name } = useParams();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning("");
      setSuccess("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  const updateBrandMutation = useMutation({
    mutationFn: updateBrand,
    onSuccess: ({ message, success }) => {
      setIsLoading(false);
      if (!success) {
        setWarning(message);
        return;
      }
      setSuccess(message);
      setTimeout(() => {
        navigate("/admin/product/brand");
      }, 2000);
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    updateBrandMutation.mutate({ ...values, id });
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col container justify-center items-center gap-4 py-4'>
        <header className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Update Brand</h1>
        </header>
        <p className='w-full text-center text-[#fa4700f1]'>{warning}</p>
        <p className='w-full text-center text-[#00771af1]'>{success}</p>
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
                    <FormDescription></FormDescription>
                  )}
                </FormItem>
              )}
            />
            <Link
              to='/admin/product/brand'
              className='text-blue-500 hover:underline'>
              Back to brands
            </Link>
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
          </form>
        </Form>
      </div>
    </>
  );
}
