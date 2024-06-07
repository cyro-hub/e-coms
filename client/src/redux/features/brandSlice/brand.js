/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBrands = createAsyncThunk("getBrands", async (brand) => {
  const result = await fetch("/api/v1/brand", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return result.json();
});

const brandSlice = createSlice({
  name: "brand",
  initialState: {
    isLoading: false,
    brands: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getBrands.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getBrands.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.brands = [
          // ...action.payload,
          // ...action.payload,
          ...action.payload,
        ]);
    });
    builder.addCase(getBrands.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { setAuthState, setCustomerName } = brandSlice.actions;

export default brandSlice.reducer;
