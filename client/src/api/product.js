/** @format */

const URI_PRODUCT = "/api/products";

export const getProductById = async ({ pageParam, queryKey }) => {
  const { productId } = queryKey[1];
  const result = await fetch(`${URI_PRODUCT}/${productId}`);

  return result.json();
};

export const createProduct = async (product) => {
  const result = await fetch(`${URI_PRODUCT}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  return result.json();
};

export const addProductThumbnail = async ({ body, id }) => {
  const result = await fetch(`${URI_PRODUCT}/thumbnail/${id}`, {
    method: "POST",
    body: body,
  });

  return result.json();
};

export const addProductImages = async ({ body, id }) => {
  const boundary = "----WebKitFormBoundary7MA4YWxkTrZu0gW";
  const result = await fetch(`${URI_PRODUCT}/upload/${id}`, {
    method: "POST",
    // headers: { "Content-Type": `multipart/form-data; boundary=${boundary}` },
    body: body,
  });

  return result.json();
};

export const getAllProducts = async (page, limit, keyword) => {
  let uri = `${URI_PRODUCT}/all?`;

  // Check and attach page parameter
  if (page !== undefined) {
    uri += `page=${page}&`;
  }

  // Check and attach limit parameter
  if (limit !== undefined) {
    uri += `limit=${limit}&`;
  }

  // Check and attach keyword parameter
  if (keyword !== undefined) {
    uri += `keyword=${keyword}`;
  }

  const result = await fetch(uri);

  return result.json();
};

export const getProducts = async ({ pageParam, queryKey }) => {
  let uri = `${URI_PRODUCT}?`;
  const { limit, keyword } = queryKey[1];

  // Check and attach page parameter
  if (pageParam !== undefined) {
    uri += `page=${pageParam}&`;
  }

  // Check and attach limit parameter
  if (limit !== undefined) {
    uri += `limit=${limit}&`;
  }

  // Check and attach keyword parameter
  if (keyword !== undefined) {
    uri += `keyword=${keyword}`;
  }

  const result = await fetch(uri);
  return result.json();
};

export const updateProduct = async ({ product, productId }) => {
  const result = await fetch(`${URI_PRODUCT}/${productId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });

  return result.json();
};

export const removeProduct = async (id) => {
  const result = await fetch(`${URI_PRODUCT}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return result.json();
};

export const getFilteredProducts = async ({ pageParam, queryKey }) => {
  let uri = `${URI_PRODUCT}/filter?`;
  const { limit, keyword, filters } = queryKey[1];

  // Check and attach page parameter
  if (pageParam !== undefined) {
    uri += `page=${pageParam}&`;
  }

  // Check and attach limit parameter
  if (limit !== undefined) {
    uri += `limit=${limit}&`;
  }

  // Check and attach keyword parameter
  if (keyword !== undefined) {
    uri += `keyword=${keyword}`;
  }

  const result = await fetch(uri, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });

  return result.json();
};

export const getNewProducts = async ({ pageParam }) => {
  const uri = `${URI_PRODUCT}/new`;
  const result = await fetch(uri);
  return result.json();
};

export const getTopProducts = async () => {
  const result = await fetch(`${URI_PRODUCT}/top`);
  return result.json();
};

export const addProductReview = async (values) => {
  const result = await fetch(`${URI_PRODUCT}/${values.productId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  return result.json();
};
