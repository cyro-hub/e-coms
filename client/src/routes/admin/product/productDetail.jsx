import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import moment from "moment";
import { Outlet } from "react-router-dom";

function productDetail({
  name,
  brand,
  createdAt,
  updatedAt,
  description,
  quantity,
  price,
  images,
  category,
}) {
  return (
    <>
      <div className="grid grid-cols-4 justify-center items-center gap-4">
        <span className="text-right italic text-xs">Name</span>
        <div className="col-span-3">{name}</div>
      </div>
      <div className="grid grid-cols-4 justify-center items-center gap-4">
        <span className="text-right italic text-xs">Brand</span>
        <div className="col-span-3">{brand?.name}</div>
      </div>
      <div className="grid grid-cols-4 justify-center items-center gap-4">
        <span className="text-right italic text-xs">Category</span>
        <div className="col-span-3">{category?.name}</div>
      </div>
      <div className="grid grid-cols-4 justify-center items-center gap-4">
        <span className="text-right italic text-xs">Price</span>
        <div className="col-span-3">{`${price}kwd`}</div>
      </div>
      <div className="grid grid-cols-4 justify-center items-center gap-4">
        <span className="text-right italic text-xs">Quantity</span>
        <div className="col-span-3">{`${quantity} pcs`}</div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <span className="text-right italic text-xs">Description</span>
        <div className="col-span-3">{description}</div>
      </div>
      <div className="grid grid-cols-4 justify-center items-center gap-4">
        <span className="text-right italic text-xs">Created At</span>
        <div className="col-span-3">{moment(createdAt).format("LLLL")}</div>
      </div>
      <div className="grid grid-cols-4 justify-center items-center gap-4">
        <span className="text-right italic text-xs">Updated At</span>
        <div className="col-span-3">{moment(updatedAt).format("LLLL")}</div>
      </div>
      {/* <div className="flex flex-col gap-4 h-[150px] overflow-auto no-scrollbar">
        {images?.map((image,index) => {
          return (
            <a href={image} target="blank" key={index}>
              {image.split("/")[image.split("/").length - 1]}
            </a>
          );
        })}
      </div> */}
    </>
  );
}

export default productDetail;
