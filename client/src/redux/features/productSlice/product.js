import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    filters: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action?.payload;
    },
    setFilters: (state, action) => {
      state.filters = action?.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
