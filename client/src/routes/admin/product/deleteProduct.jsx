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
import { removeProduct } from "../../../api/product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function DeleteProduct({
  _id,
  name,
  category,
  brand,
  description,
}) {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mutation = useMutation({
    mutationFn: removeProduct,
    onSuccess: ({ message, success, product }) => {
      setIsLoading(false);
      if (!success) {
        setMessage(message);
        return;
      }
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  const onSubmit = async () => {
    mutation.mutate({ productId: _id });
  };

  return (
    <Dialog>
      <DialogTrigger>Delete Product</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#000514]">
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
          <DialogDescription>
            Delete product here. Click delete when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="w-full text-center text-[#ffffff80]">{message}</p>
          <div className="grid grid-cols-4 justify-center items-center gap-4">
            <span className="text-right italic text-xs">Name</span>
            <div className="col-span-3">{name}</div>
          </div>
          <div className="grid grid-cols-4 justify-center items-center gap-4">
            <span className="text-right italic text-xs">Brand</span>
            <div className="col-span-3">{brand}</div>
          </div>
          <div className="grid grid-cols-4 justify-center items-center gap-4">
            <span className="text-right italic text-xs">Category</span>
            <div className="col-span-3">{category?.name}</div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <span className="text-right italic text-xs">Description</span>
            <div className="col-span-3">{description}</div>
          </div>
          <DialogFooter>
            <div className="w-full flex justify-center items-center flex-col space-y-2">
              {isLoading ? (
                <Button className="bg-[#ff782a]]" disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="bg-[#ff782a] w-[70%]" onClick={onSubmit}>
                  delete
                </Button>
              )}
            </div>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
