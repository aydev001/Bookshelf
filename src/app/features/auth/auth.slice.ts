import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthenticated: boolean;
  authLoading: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: true,
  authLoading: true,
};

export const checkIsAuthenticated = createAsyncThunk(
  "auth/checkIsAuthenticated",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("authToken");
    return !!token; // true yoki false qaytaradi
  }
);

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkIsAuthenticated.pending, (state) => {
        state.authLoading = true;
      })
      .addCase(checkIsAuthenticated.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload;
        state.authLoading = false;
      })
      .addCase(checkIsAuthenticated.rejected, (state) => {
        state.isAuthenticated = false;
        state.authLoading = false;
      });
  },
});

export default authSlice.reducer;
