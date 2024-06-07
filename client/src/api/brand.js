/** @format */
const URI_BRAND = "/api/v1/brand";

export const addBrandThumbnail = async ({ id, body }) => {
  const result = await fetch(`${URI_BRAND}/${id}`, {
    method: "POST",
    body: body,
  });

  return result.json();
};

export const updateBrand = async ({ name, id }) => {
  const result = await fetch(`${URI_BRAND}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
    }),
  });

  return await result.json();
};

export const addBrand = async ({ name, formData }) => {
  try {
    const response = await fetch(URI_BRAND, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error adding brand:", error);
    throw error;
  }
};
