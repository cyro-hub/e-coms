/** @format */

const URI_ORDER = "/api/v1/order";

export const createOrder = async (values) => {
  const result = await fetch(`${URI_ORDER}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  return result.json();
};

export const getCustomersOrders = async () => {
  const result = await fetch(`${URI_ORDER}/customer`);

  return result.json();
};
