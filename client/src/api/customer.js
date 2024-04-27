/** @format */
const URI_PRODUCT = "/api/customer";

export const loginCustomer = async (values) => {
  const result = await fetch(`${URI_PRODUCT}/auth`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  return result.json();
};

export const registerCustomer = async (values) => {
  const result = await fetch(`${URI_PRODUCT}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  return result.json();
};

export const userAuth = async (url, body) => {
  return await fetch(`/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export const authenticateUser = async () => {
  const result = await fetch(`${URI_PRODUCT}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  return result.json();
};
