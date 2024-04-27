/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getCategories = createAsyncThunk(
  "getCategories",
  async (category) => {
    const result = await fetch("/api/category", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return result.json();
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    categories: [],
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      (state.isLoading = false),
        (state.categories = [
          // ...action.payload,
          // ...action.payload,
          ...action.payload,
        ]);
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { setAuthState, setCustomerName } = categorySlice.actions;

export default categorySlice.reducer;
