/** @format */
const URI_CATEGORY = "/api/category";

export const addCategoryThumbnail = async ({ id, body }) => {
  const result = await fetch(`${URI_CATEGORY}/upload/${id}`, {
    method: "POST",
    body: body,
  });

  return result.json();
};

export const addCategory = async ({ name, formData }) => {
  try {
    const response = await fetch(URI_CATEGORY, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name }),
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};
