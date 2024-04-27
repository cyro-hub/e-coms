/** @format */

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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdPhotoCamera } from "react-icons/md";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addCategoryThumbnail } from "@/api/category";

export default function AddCategoryThumbnail({ _id }) {
  const [warning, setWarning] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);

  const handleImageSelect = (e) => setImage(e.target.files[0]);

  const addCategoryThumbnailMutation = useMutation({
    mutationFn: addCategoryThumbnail,
    onSuccess: ({ message, success }) => {
      setIsLoading(false);
      if (!success) {
        setWarning(message);
        return;
      }
      setImage(null);
      setSuccess(message);
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
    const formData = new FormData();
    formData.append("image", image);

    addCategoryThumbnailMutation.mutate({ body: formData, id: _id });
  };

  return (
    <Dialog>
      <DialogTrigger>Add thumbnail</DialogTrigger>
      <DialogContent className='sm:max-w-[425px] bg-[#000514]'>
        <DialogHeader>
          <DialogTitle>Add CategoryThumbnail</DialogTitle>
          <DialogDescription>
            Add categories thumbnail here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <p className='w-full text-center text-[#fa4700f1]'>{warning}</p>
          <p className='w-full text-center text-green-500 '>{success}</p>
          <div className='w-full flex flex-col justify-center items-center gap-4'>
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
          <DialogFooter>
            <div className='w-full flex justify-center items-center flex-col space-y-2'>
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
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
