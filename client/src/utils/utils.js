/** @format */

import { toast } from "sonner";

export const handleAddToCart = ({
  productId,
  name,
  brand,
  price,
  thumbnail,
  discount,
}) => {
  const productToAdd = {
    _id: productId,
    name,
    price,
    thumbnail,
    qty: 1,
    brand,
    discount,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingProductIndex = cart.findIndex((item) => item._id === productId);

  if (existingProductIndex !== -1) {
    cart[existingProductIndex].qty += 1;
  } else {
    cart.push(productToAdd);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  toast("Product added to cart successfully", {
    description: `Name: ${name} price: ${price}`,
    action: {
      label: "Undo",
      onClick: () => handleRemoveFromCart(productId),
    },
  });
};

export const handleGetCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  return cart;
};

export const handleChangeItemQuantity = (quantity, id) => {
  const value = parseInt(quantity, 10);
  if (!isNaN(value) && value > 0) {
    // Additional logic to update the quantity in the cart can be added here
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = cart.findIndex((item) => item.id === id);
    if (productIndex !== -1) {
      cart[productIndex].qty = value;
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
};

export const handleRemoveFromCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // console.log(cart);
  cart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  toast("Product removed from cart successfully!");
};
