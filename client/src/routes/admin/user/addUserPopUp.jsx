/** @format */

import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
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
import { getUsers } from "@/redux/features/userSlice/user";
import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "@/api/customer";

const formSchema = z.object({
  password: z.string().min(8, {
    message: "password must be at least 8 characters.",
  }),
  name: z.string().min(8, {
    message: "name must be at least 8 characters.",
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

export default function AddUser() {
  const { isError, users } = useSelector((state) => state.userState);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: "",
      password: "",
      name: "",
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
      const { user, message, success } = await userAuth("user", values);

      if (success) {
        form.reset();
        dispatch(getUsers());
      }
      setMessage(message);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-[#000514]'>
        <DialogHeader>
          <DialogTitle>Add User</DialogTitle>
          <DialogDescription>
            Add User here. Click save when you're done.
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
                name='employeeId'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='employeeId'
                        type='number'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.employeeId ? (
                      <FormMessage />
                    ) : form.getValues().employeeId === "" ? (
                      <p className='h-5'></p>
                    ) : (
                      <FormDescription>Enter your employeeId.</FormDescription>
                    )}
                  </FormItem>
                )}
              />
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
                      <FormDescription>Enter your name.</FormDescription>
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
                      <Input
                        type='password'
                        placeholder='password'
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.password ? (
                      <FormMessage />
                    ) : form.getValues().password === "" ? (
                      <p className='h-5'></p>
                    ) : (
                      <FormDescription>Enter the password.</FormDescription>
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
