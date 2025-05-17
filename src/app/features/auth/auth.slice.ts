import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  isAuthenticated: boolean;
  fetchIsAuthenticated : boolean;
}

const initialState: IAuthState = {
  isAuthenticated: true,
  fetchIsAuthenticated : false
};


const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setIsAuthenticated : (state, action:PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload
    },

    setFetchAuth : (state, action:PayloadAction<boolean>) => {
      state.fetchIsAuthenticated = action.payload
    }
  }
});


export const {setIsAuthenticated, setFetchAuth} = authSlice.actions
export default authSlice.reducer;
