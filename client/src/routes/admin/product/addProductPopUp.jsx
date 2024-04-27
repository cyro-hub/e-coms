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
import { Textarea } from "@/components/ui/textarea";
import { Link, useNavigate, Outlet } from "react-router-dom";
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

export default function AddProduct() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { categories } = useSelector((state) => state.categoryState);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      brand: "",
      description: "",
      category: "",
      price: 0,
      quantity: 0,
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
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
        setMessage(message);
        return;
      }
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate(`/admin/products/upload/${product?._id}`);
    },
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    mutation.mutate(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#000514]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Add product details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-1">
          <p className="w-full text-center text-[#ffffff80]">{message}</p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 min-w-[250px] max-w-[420px] rounded-[10px] py-2 px-4 pt-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="name" {...field} />
                    </FormControl>
                    {form.formState.errors.name ? (
                      <FormMessage />
                    ) : form.getValues().name === "" ? (
                      <p className="h-5"></p>
                    ) : (
                      <FormDescription>Enter your name.</FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="text" placeholder="brand" {...field} />
                    </FormControl>
                    {form.formState.errors.brand ? (
                      <FormMessage />
                    ) : form.getValues().brand === "" ? (
                      <p className="h-5"></p>
                    ) : (
                      <FormDescription>Enter brand.</FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel>Cateogory</FormLabel> */}
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category to display" />
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
                      <p className="h-5"></p>
                    ) : (
                      <FormDescription>Select category.</FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="price" {...field} />
                    </FormControl>
                    {form.formState.errors.price ? (
                      <FormMessage />
                    ) : form.getValues().price === "" ? (
                      <p className="h-5"></p>
                    ) : (
                      <FormDescription>Enter price.</FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="number" placeholder="quantity" {...field} />
                    </FormControl>
                    {form.formState.errors.quantity ? (
                      <FormMessage />
                    ) : form.getValues().quantity === "" ? (
                      <p className="h-5"></p>
                    ) : (
                      <FormDescription>Enter quantity.</FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Write a description about the product"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    {form.formState.errors.description ? (
                      <FormMessage />
                    ) : form.getValues().description === "" ? (
                      <p className="h-5"></p>
                    ) : (
                      <FormDescription>
                        Enter product description.
                      </FormDescription>
                    )}
                  </FormItem>
                )}
              />
              <DialogFooter>
                <div className="w-full flex justify-center items-center flex-col space-y-2">
                  {isLoading ? (
                    <Button className="bg-[#0a4203]" disabled>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    <Button className="bg-[#0a4203] w-[70%]" type="submit">
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
