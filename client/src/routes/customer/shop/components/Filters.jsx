/** @format */

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LiaFilterSolid } from "react-icons/lia";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import Select from "react-dropdown-select";
import { Separator } from "@/components/ui/separator";
import { ComboboxDemo } from "./Combobox";

const options = [
  {
    id: 1,
    name: "Leanne Graham",
  },
  {
    id: 2,
    name: "Ervin Howell",
  },
  {
    id: 3,
    name: "Ervin Howell",
  },
  {
    id: 4,
    name: "Ervin Howell",
  },
  {
    id: 5,
    name: "Ervin Howell",
  },
  {
    id: 6,
    name: "Ervin Howell",
  },
];

function Filters() {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const handleChanges = (e) => {
    console.log(e);
  };

  const handleRangeChanges = (range) => {
    setPriceRange(range);
  };

  return (
    <Sheet>
      <SheetTrigger>
        <LiaFilterSolid size={22} />
      </SheetTrigger>
      <SheetContent className='w-[400px] sm:w-[540px]'>
        <div className='flex flex-col gap-4 mt-6'>
          <Select
            options={options}
            labelField='name'
            valueField='id'
            autoFocus
            multi
            onChange={handleChanges}
            dropdownGap={6}
            className='text-black bg-transparent font-bold'
            placeholder='select category...'
          />
          <Select
            options={options}
            labelField='name'
            valueField='id'
            autoFocus
            multi
            onChange={handleChanges}
            dropdownGap={6}
            className='text-black bg-transparent font-bold'
            placeholder='select brand...'
            //   onChange={(values) => this.setValues(values)}
          />
          <ComboboxDemo />
          <div className='flex justify-between text-sm py-2'>
            <span>Min Price: {priceRange[0]} kd</span>
            <span>Max Price: {priceRange[1]} kd</span>
          </div>
          <RangeSlider
            min={1}
            value={priceRange}
            step={2}
            max={500}
            onInput={handleRangeChanges}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default Filters;
