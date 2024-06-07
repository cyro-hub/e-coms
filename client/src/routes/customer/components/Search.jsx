/** @format */

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { ImSearch } from "react-icons/im";

function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const previouslyViewedProducts = ["Product 1", "Product 2", "Product 3"]; // Example data

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  return (
    <>
      <ImSearch size={20} onClick={openModal} />
      <Dialog open={isOpen} onClose={closeModal} className='relative z-50'>
        <div className='fixed inset-0' aria-hidden='true' />

        <div className='fixed bg-[#000514]/40 inset-0 flex items-center justify-center p-4'>
          <Dialog.Panel className='mx-auto md:w-[700px] sm:w-[98vw] backdrop-filter backdrop-blur-md rounded-md bg-[#fff]/10 p-2 px-4'>
            <div className='relative'>
              <input
                type='text'
                className='block w-full pr-7 py-2 bg-transparent text-blue border-b border-gray-100/50 focus:outline-none focus:ring-0 sm:text-lg'
                placeholder='Search...'
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <ImSearch
                className='absolute right-1 top-1/2 transform -translate-y-1/2'
                size={18}
              />
            </div>
            <div className='mt-4'>
              <ul className='list-disc list-inside'>
                {previouslyViewedProducts.map((product, index) => (
                  <li key={index} className=''>
                    {product}
                  </li>
                ))}
              </ul>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

export default SearchModal;
