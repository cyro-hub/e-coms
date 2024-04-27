"use client";
import React, { useEffect } from "react";
import { TiThMenu } from "react-icons/ti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaPowerOff } from "react-icons/fa";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

function Navbar() {
  return (
    <div className="container mt-2">
      <Sheet>
        <SheetTrigger>
          <TiThMenu size={25} />
        </SheetTrigger>
        <SheetContent side="left">
          <div className="flex flex-col w-full h-full my-10">
            <div className="flex flex-col justify-center items-center">
              <SheetClose>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <h4 className="w-full text-center">Name</h4>
              </SheetClose>
            </div>
            <div className="flex flex-col justify-center items-center mt-8 gap-3">
              <SheetClose asChild>
                <Link
                  to="/admin"
                  className="text-[#ffffff99] hover:text-[#fff]">
                  Dashboard
                </Link>
              </SheetClose>

              <Separator className="my-1 w-[50%] mb-10" />
              <SheetClose asChild>
                <Link
                  to="/admin/user"
                  className="text-[#ffffff99] hover:text-[#fff]">
                  Manage team
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/admin/products"
                  className="text-[#ffffff99] hover:text-[#fff]">
                  Manage products
                </Link>
              </SheetClose>
              <Separator className="my-1 w-[50%] mb-10" />
              <SheetClose asChild>
                <Link
                  to="/admin"
                  className="text-[#ffffff99] hover:text-[#fff]">
                  Process orders
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/admin"
                  className="text-[#ffffff99] hover:text-[#fff]">
                  Contact information
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/admin"
                  className="text-[#ffffff99] hover:text-[#fff]">
                  Calender
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  to="/admin"
                  className="text-[#ffffff99] hover:text-[#fff]">
                  faq
                </Link>
              </SheetClose>
            </div>
            <div className="mt-auto mb-10 flex justify-center items-center">
              <SheetClose asChild>
                <Link
                  to="/admin"
                  className="text-[#ffffff99] hover:text-[#fff] flex items-center px-6 py-1 rounded-md hover:border-">
                  <FaPowerOff className="mr-2" /> logout
                </Link>
              </SheetClose>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Navbar;
