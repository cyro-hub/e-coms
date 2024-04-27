/** @format */

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaCheck } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa";
import moment from "moment";

function orderDetails({
  _id,
  totalPrice,
  shippingAddress,
  orderItems,
  isPaid,
  isDelivered,
  createdAt,
  paymentMethod,
  itemsPrice,
}) {
  return (
    <div className=''>
      <Accordion type='single' collapsible>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <div className='flex flex-wrap w-full gap-4 justify-betweeen'>
              <div className='grow flex items-center'>
                {isPaid && isDelivered ? (
                  <FaCheckDouble className='text-green-900' size={20} />
                ) : (
                  <FaCheck size={20} className='text-orange-900' />
                )}
              </div>
              <div className='grow flex items-center'>
                Order_ID:<span className='font-bold text-xl'>{_id}</span>
              </div>
              <div className='grow flex items-center'>
                total price_
                <span className='font-bold text-xl'>{totalPrice}kd</span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Order Items</AccordionTrigger>
                <AccordionContent>
                  <div className='w-full overflow-x-auto'>
                    <table className='table-auto w-full text-left whitespace-no-wrap border bg-[#ffffff10]'>
                      <thead>
                        <tr className='border-b'>
                          <th className='px-4 py-3 border-r'>Thumbnail</th>
                          <th className='px-4 py-3 border-r'>Item</th>
                          <th className='px-4 py-3 border-r'>Qty</th>
                          <th className='px-4 py-3'>Total Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Data rows will be generated dynamically */}
                        {orderItems?.map(
                          ({ thumbnail, name, price, qty, discount, _id }) => (
                            <tr className='border-b' key={_id}>
                              <td className='px-4 py-3 border-r'>
                                <img className='h-20' src={thumbnail} alt='' />
                              </td>
                              <td className='px-4 py-3 border-r'>
                                <span className='font-bold text-sm'>
                                  {name}
                                </span>
                              </td>
                              <td className='px-4 py-3 border-r'>
                                <span className='text-gray-300 text-xs'>
                                  {qty > 1 ? `${qty}pcs` : `${qty}pc`}
                                </span>
                              </td>
                              <td className='px-4 py-3'>
                                <span className='text-gray-300 text-xs'>
                                  {qty * (price - (discount / 100) * price)}kd
                                </span>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Order Details</AccordionTrigger>
                <AccordionContent>
                  <div className='flex flex-row justify-between items-baseline flex-wrap bg-[#ffffff10] p-2'>
                    <table className='w-full text-sm text-left'>
                      <thead className='text-xs'>
                        <tr>
                          <th scope='col' className='py-3 px-6'>
                            Paid
                          </th>
                          <th scope='col' className='py-3 px-6'>
                            Delivered
                          </th>
                          <th scope='col' className='py-3 px-6'>
                            createdAt
                          </th>
                          <th scope='col' className='py-3 px-6'>
                            Items Price
                          </th>
                          <th scope='col' className='py-3 px-6'>
                            Payment method
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className=''>
                          <td className='py-4 px-6'>
                            {isPaid ? (
                              <FaCheck className='text-green-900' />
                            ) : (
                              <FaCheck className='text-orange-500' />
                            )}
                          </td>
                          <td className='py-4 px-6'>
                            {isDelivered ? (
                              <FaCheck className='text-green-900' />
                            ) : (
                              <FaCheck className='text-orange-500' />
                            )}
                          </td>
                          <td className='py-4 px-6'>
                            {moment(createdAt).format("lll")}
                          </td>
                          <td className='py-4 px-6'>
                            {itemsPrice}
                            {"kd"}
                          </td>
                          <td className='py-4 px-6'>{paymentMethod}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger>Shipping Address</AccordionTrigger>
                <AccordionContent>
                  <div className='bg-[#ffffff10] p-2'>
                    {`
                    ${shippingAddress?.governorate}, ${shippingAddress?.city}, Block ${shippingAddress?.block}, Street ${shippingAddress?.street}, Building ${shippingAddress?.building}, Flat
                    ${shippingAddress?.flatNumber}
                  `}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default orderDetails;
