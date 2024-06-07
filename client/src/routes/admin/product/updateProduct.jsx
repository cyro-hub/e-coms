/** @format */

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, Outlet, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { getCategories } from "@/redux/features/categorySlice/category";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/api/product";
import Navbar from "../component/nav";
import { getProductById } from "@/api/product";

const formSchema = z.object({
  name: z.string().min(8, {
    message: "name must be at least 8 characters.",
  }),
  category: z.string(),
  description: z.string(),
  brand: z.string(),
  quantity: z
    .string()
    .transform((str) => parseInt(str))
    .refine((num) => !isNaN(num) && num >= 0 && num <= 10000, {
      message: "Value must be a valid number between 0 and 10000",
    }),
  price: z
    .string()
    .transform((str) => parseFloat(str))
    .refine((num) => !isNaN(num), {
      message: "Value must be a valid number",
    }),
});

export default function UpdateProduct() {
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { categories } = useSelector((state) => state.categoryState);
  const { brands } = useSelector((state) => state.brandState);

  const { id } = useParams();
  const { data, error, isFetching, status } = useQuery({
    queryKey: ["product", { id }],
    queryFn: getProductById,
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.product?.name || "",
      brand: "",
      description: data?.product?.description || "",
      category: "",
      price: data?.product?.price || 0,
      quantity: data?.product?.quantity || 0,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setWarning("");
      setSuccess("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: ({ message, success, product }) => {
      setIsLoading(false);
      if (!success) {
        setWarning(message);
        return;
      }
      setSuccess(message);
      setTimeout(() => {
        navigate("/admin/product");
      }, 2000);
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    mutation.mutate(values);
    // console.log(values)
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col container justify-center items-center gap-4 py-4'>
        <header className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Update Category</h1>
        </header>
        <p className='w-full text-center text-[#fa4700f1]'>{warning}</p>
        <p className='w-full text-center text-[#00771af1]'>{success}</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-1 min-w-[250px] max-w-[420px] rounded-[10px] py-2 px-4 pt-2'>
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
            {/* <FormField
              control={form.control}
              name='brand'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='text' placeholder='brand' {...field} />
                  </FormControl>
                  {form.formState.errors.brand ? (
                    <FormMessage />
                  ) : form.getValues().brand === "" ? (
                    <p className='h-5'></p>
                  ) : (
                    <FormDescription>Enter brand.</FormDescription>
                  )}
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name='brand'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Cateogory</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a brand to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {brands?.map((brand) => (
                        <SelectItem value={brand._id} key={brand._id}>
                          {brand.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.brand ? (
                    <FormMessage />
                  ) : form.getValues().brand === "" ? (
                    <p className='h-5'></p>
                  ) : (
                    <FormDescription>Select brand.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='category'
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Cateogory</FormLabel> */}
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category to display' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map((category) => (
                        <SelectItem value={category._id} key={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {form.formState.errors.category ? (
                    <FormMessage />
                  ) : form.getValues().category === "" ? (
                    <p className='h-5'></p>
                  ) : (
                    <FormDescription>Select category.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='price'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='number' placeholder='price' {...field} />
                  </FormControl>
                  {form.formState.errors.price ? (
                    <FormMessage />
                  ) : form.getValues().price === "" ? (
                    <p className='h-5'></p>
                  ) : (
                    <FormDescription>Enter price.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type='number' placeholder='quantity' {...field} />
                  </FormControl>
                  {form.formState.errors.quantity ? (
                    <FormMessage />
                  ) : form.getValues().quantity === "" ? (
                    <p className='h-5'></p>
                  ) : (
                    <FormDescription>Enter quantity.</FormDescription>
                  )}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder='Write a description about the product'
                      className='resize-none'
                      {...field}
                    />
                  </FormControl>
                  {form.formState.errors.description ? (
                    <FormMessage />
                  ) : form.getValues().description === "" ? (
                    <p className='h-5'></p>
                  ) : (
                    <FormDescription>
                      Enter product description.
                    </FormDescription>
                  )}
                </FormItem>
              )}
            />
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
