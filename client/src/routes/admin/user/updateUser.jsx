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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "@/components/ui/checkbox";
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
  isActive: z.boolean(),
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
  isAdmin: z.boolean().default(false).optional(),
});

export default function UpdateUser({ employee }) {
  const { isError, users } = useSelector((state) => state.userState);
  const { role, name, isActive, employeeId } = employee;
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      employeeId: employeeId,
      name: name,
      isAdmin: role.includes("admin"),
      isActive: isActive,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  const onSubmit = async (values) => {
    const { employeeId, name, isActive, isAdmin } = values;
    const employee = {
      employeeId,
      name,
      role: isAdmin ? ["user", "admin"] : ["user"],
      isActive: isActive,
    };

    try {
      setIsLoading(true);
      const { user, message, success } = await fetch("/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
      }).then((res) => res.json());

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

  return (
    <Dialog>
      <DialogTrigger>Update user</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-[#000514]'>
        <DialogHeader>
          <DialogTitle>Update User</DialogTitle>
          <DialogDescription>
            Update User here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <p className='w-full text-center text-[#ffffff80]'>{message}</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-4 min-w-[250px] max-w-[420px] rounded-[10px] py-6 px-4'>
              <FormField
                control={form.control}
                name='employeeId'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='employeeId'
                        type='number'
                        disabled
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter your employeeId.</FormDescription>
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
                name='isActive'
                render={({ field }) => (
                  <FormItem className='space-y-3'>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className='flex gap-6 pb-2'>
                        <FormItem className='flex items-center'>
                          <FormControl>
                            <RadioGroupItem value={true} />
                          </FormControl>
                          <FormLabel className='font-normal pl-4 pb-2'>
                            isActive
                          </FormLabel>
                        </FormItem>
                        <FormItem className='flex items-center'>
                          <FormControl>
                            <RadioGroupItem value={false} />
                          </FormControl>
                          <FormLabel className='font-normal pl-4 pb-2'>
                            not-Active
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='isAdmin'
                render={({ field }) => (
                  <FormItem className='flex items-center space-x-3 space-y-0'>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel>add admin</FormLabel>
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
