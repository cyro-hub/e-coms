/** @format */

import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdPhotoCamera } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addBrandThumbnail } from "@/api/brand";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../component/nav";

export default function AddCategoryThumbnail({ _id }) {
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const { id, name } = useParams();

  const handleImageSelect = (e) => setImage(e.target.files[0]);

  const addBrandThumbnailMutation = useMutation({
    mutationFn: addBrandThumbnail,
    onSuccess: ({ message, success }) => {
      setIsLoading(false);
      if (!success) {
        setWarning(message);
        return;
      }
      setSuccess(message);
      setImage(null);
      setTimeout(() => {
        navigate("/admin/product/brand");
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

  const onSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);
    setIsLoading(true);
    addBrandThumbnailMutation.mutate({ body: formData, id: id });
  };

  return (
    <>
      <Navbar />
      <div className='flex flex-col container justify-center items-center gap-4 py-4'>
        <header className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Add Brand Thumbnail</h1>
        </header>
        <p className='w-full text-center text-[#fa4700f1]'>{warning}</p>
        <p className='w-full text-center text-green-500 '>{success}</p>
        <div className='w-full flex flex-col justify-center items-center gap-4'>
          <div className='w-full text-center'>
            <h2 className='text-lg font-semibold text-gray-700'>
              Brand: {name}
            </h2>
          </div>
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
        </div>
        <Link
          to='/admin/product/brand'
          className='text-blue-500 hover:underline'>
          Back to Brands
        </Link>
        <div className='w-[50%] flex justify-center items-center flex-col space-y-2'>
          {isLoading ? (
            <Button className='bg-[#0a4203]' disabled>
              <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button className='bg-[#0a4203] w-[70%]' onClick={onSubmit}>
              save
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
