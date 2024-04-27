/** @format */

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
import { setAuthState } from "../../../redux/features/userSlice/user";
import { toast } from "sonner";
import moment from "moment";
import { ReloadIcon } from "@radix-ui/react-icons";
import { registerCustomer } from "@/api/customer";
import Footer from "@/routes/customer/components/footer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Nav from "../components/nav-sm";
import { useMutation } from "@tanstack/react-query";

const formSchema = z.object({
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  name: z
    .string()
    .min(4, {
      message: "password must be at least 4 characters.",
    })
    .max(15, { message: "name must not be above 15 length" }),
  email: z.string().email(true, {
    message: "your entry is not an email.",
  }),
});

function Register() {
  const dispatch = useDispatch();

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    mutation.mutate(values);
  };

  const mutation = useMutation({
    mutationFn: registerCustomer,
    onSuccess: ({ message, success, customer }) => {
      if (success) {
        dispatch(setAuthState());
        dispatch({
          type: "user/setUser",
          payload: customer,
        });
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

  return (
    <>
      <Nav />
      <div className='container flex flex-col flex-1 justify-center items-center h-full mt-6'>
        <h2 className='text-2xl font-bold text-center my-4'>
          Customer Registration
        </h2>
        <p className='text-orange-600'>{message}</p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='md:w-[500px] flex flex-col gap-4'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='name' {...field} />
                  </FormControl>
                  {form.formState.errors.name ? (
                    <FormMessage />
                  ) : form.getValues().name === "" ? (
                    <p className='h-5'></p>
                  ) : (
                    <FormDescription>Enter your name.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='email' {...field} />
                  </FormControl>
                  {form.formState.errors.email ? (
                    <FormMessage />
                  ) : form.getValues().email === "" ? (
                    <p className='h-5'></p>
                  ) : (
                    <FormDescription>Enter your email.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='password' placeholder='password' {...field} />
                  </FormControl>
                  {form.formState.errors.password ? (
                    <FormMessage />
                  ) : form.getValues().password === "" ? (
                    <p className='h-5'></p>
                  ) : (
                    <FormDescription>Enter your password.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <div className='w-full flex justify-between items-center flex-col space-y-2'>
              {isLoading ? (
                <Button className='bg-[#0a4203]' disabled>
                  <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                  Please wait
                </Button>
              ) : (
                <Button className='bg-[#0a4203] w-[70%]' type='submit'>
                  register
                </Button>
              )}
            </div>
          </form>
        </Form>
        <div className='mt-2 text-center'>
          <p>Do you have an account?</p>
          <Link to='/auth' className='text-[#0a4203] hover:underline'>
            Login here
          </Link>
        </div>
        <p>Or continue with</p>
        <div className='flex justify-center items-center gap-4 mt-2'>
          <button className='bg-transparent border p-1 rounded-md px-10 '>
            <FaFacebook className='text-blue-600' size={24} />
          </button>
          <button className='bg-transparent border p-1 rounded-md px-10 '>
            <FcGoogle size={24} />
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
