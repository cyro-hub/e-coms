import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "../component/nav";
import ProductDetail from "./productDetail";
import { Label } from "@/components/ui/label";
import { MdPhotoCamera } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { getProductById, addProductThumbnail } from "@/api/product";

function uploadProductThumbnail() {
  const { productId } = useParams();
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { data, isError, isPending, isSuccess } = useQuery({
    queryKey: ["product", { productId }],
    queryFn: getProductById,
  });

  const onSubmit = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
      setIsLoading(true);
      mutation.mutate({ body: formData, id: productId });
    }
  };

  const handleImageSelect = (e) => setImage(e.target.files[0]);

  const mutation = useMutation({
    mutationFn: addProductThumbnail,
    onSuccess: ({ message, success, product }) => {
      setIsLoading(false);
      if (!success) {
        setMessage(message);
        return;
      }
      setImage(null);
      toast(message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      setIsLoading(false);
      setMessage("some error occured");
    },
  });

  useEffect(() => {
    if (!data?.success) setMessage(data?.message);
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage("");
    }, 4000);

    return () => clearTimeout(timer);
  });

  return (
    <>
      <Navbar />
      <div className="container flex gap-8 h-[80vh] py-4 justify-center items-center">
        <div className="flex flex-col gap-4 max-w-[50%] py-4 overflow-auto no-scrollbar">
          {data?.success && <ProductDetail {...data?.product} />}
        </div>
        <div className="w-[300px] flex flex-col gap-4">
          <p className="w-full text-center text-[#fa4700f1]">{message}</p>
          <Label htmlFor="image">
            <div className="w-full flex justify-center items-center p-4 text-center">
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="test"
                  className="w-[300px] h-auto"
                />
              ) : (
                <MdPhotoCamera size={300} />
              )}
            </div>
            <Input
              type="file"
              accept="image/jpeg, image/jpg"
              className="hidden"
              placeholder="image"
              id="image"
              onChange={handleImageSelect}
            />
          </Label>
          {isLoading ? (
            <Button className="bg-[#0a4203]" disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="bg-[#0a4203] w-full" onClick={onSubmit}>
              save
            </Button>
          )}
        </div>
      </div>
    </>
  );
}

export default uploadProductThumbnail;
