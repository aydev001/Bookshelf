import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthenticated: boolean;
}

const initialState: IAuthState = {
  isAuthenticated: false,
};


const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAuthenticated : (state, action:PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    }
  }
});


export const {setIsAuthenticated} = authSlice.actions
export default authSlice.reducer;
