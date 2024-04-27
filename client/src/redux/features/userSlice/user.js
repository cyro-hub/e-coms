import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUsers = createAsyncThunk("getUsers", async () => {
  const result = await fetch("/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await result.json();
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: true,
    user: null,
    users: [],
    isLoading: false,
    isError: false,
  },
  reducers: {
    setAuthState: (state) => {
      state.isAuthenticated = !state.isAuthenticated;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      (state.isLoading = false), (state.users = action.payload);
    });
    builder.addCase(getUsers.rejected, (state, action) => {
      state.isError = true;
    });
  },
});

export const { setAuthState } = userSlice.actions;

export default userSlice.reducer;
