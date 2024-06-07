/** @format */

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import { MdPhotoCamera } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCategory, addCategoryThumbnail } from "@/api/category";
import Navbar from "../component/nav";
import { Link, useNavigate } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(8, {
    message: "name must be at least 8 characters.",
  }),
});

export default function AddCategory() {
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });
  const queryClient = useQueryClient();

  const handleImageSelect = (e) => setImage(e.target.files[0]);

  const addCategoryMutation = useMutation({
    mutationFn: addCategory,
    onSuccess: ({ message, success }) => {
      setIsLoading(false);
      if (!success) {
        setWarning(message);
        return;
      }
      setSuccess(message);
      setTimeout(() => {
        navigate("/admin/product/category");
      }, 2000);
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning("");
      setSuccess("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    addCategoryMutation.mutate({ ...values });
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col container justify-center items-center gap-4 py-4'>
        <header className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Add Category</h1>
        </header>
        <p className='w-full text-center text-[#fa4700f1]'>{warning}</p>
        <p className='w-full text-center text-[#00771af1]'>{success}</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 min-w-[250px] max-w-[420px] rounded-[10px] py-2 px-4 pt-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category name</FormLabel>
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
            {/* <div className='w-full flex flex-col justify-center items-center gap-4'>
              <Label htmlFor='image'>
                <div className='w-full flex justify-center items-center'>
                  {image ? (
                    <img
                      src={URL.createObjectURL(image)}
                      alt='test'
                      className='w-[300px] h-auto rounded-md'
                    />
                  ) : (
                    <MdPhotoCamera size={300} />
                  )}
                </div>
                <Input
                  type='file'
                  accept='image/jpeg, image/jpg'
                  className='hidden'
                  placeholder='image'
                  id='image'
                  onChange={handleImageSelect}
                />
              </Label>
            </div> */}
            <Link
              to='/admin/product/category'
              className='text-blue-500 hover:underline'>
              Back to Categories
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
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
