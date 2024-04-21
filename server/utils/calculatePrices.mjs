/** @format */

export default function calcPrices({ orderItems, shippingPrice }) {
  const itemsPrice = orderItems.reduce(
    (acc, item) =>
      acc +
      (item.price -
        (item.discount > 0 && Number(item.price * (item.discount / 100)))) *
        item.qty,
    0
  );

  const totalPrice = (itemsPrice + parseFloat(shippingPrice)).toFixed(3);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: parseFloat(shippingPrice).toFixed(2),
    totalPrice,
  };
}
