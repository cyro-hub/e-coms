"use client";

import React, { useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector, useDispatch } from "react-redux";
// import { ReloadIcon } from "@radix-ui/react-icons";
import { setAuthState } from "../../../redux/features/userSlice/user";
import { toast } from "sonner";
import moment from "moment";
import { userAuth } from "@/api/customer";
import Navbar from "../component/nav";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  employeeId: z
    .string()
    .min(4, {
      message: "Invalid employeeId.",
    })
    .max(5, {
      message: "Invalid employeeId.",
    }),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state) => state.customer);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
      password: "",
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
      const { user, message, success } = await userAuth("user/auth", values);

      if (success) {
        dispatch(setAuthState());
        dispatch({
          type: "user/setUser",
          payload: user,
        });
        form.reset();
        toast(message, {
          description: moment().format("LLLL"),
        });
      } else {
        setMessage(message);
      }
    } catch (error) {
      setMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="container relative flex flex-col basis-1/3 justify-between items-center py-4 h-full">
        <Navbar />
        <div className="w-full flex flex-col flex-1 justify-center items-center h-full mt-6">
          <p className="text-orange-600">{message}</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 min-w-[250px] max-w-[420px] rounded-[10px] py-6 px-4 pt-10">
              <FormField
                control={form.control}
                name="employeeId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="employeeId"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.employeeId ? (
                      <FormMessage />
                    ) : form.getValues().employeeId === "" ? (
                      <p className="h-5"></p>
                    ) : (
                      <FormDescription>Enter your employeeId.</FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.password ? (
                      <FormMessage />
                    ) : form.getValues().password === "" ? (
                      <p className="h-5"></p>
                    ) : (
                      <FormDescription>Enter your password.</FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <div className="w-full flex justify-center items-center flex-col space-y-2">
                {isLoading ? (
                  <Button className="bg-[#0a4203]" disabled>
                    {/* <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> */}
                    Please wait
                  </Button>
                ) : (
                  <Button className="bg-[#0a4203] w-[70%]" type="submit">
                    login
                  </Button>
                )}
                <Outlet />
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
