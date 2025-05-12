import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  isSignUpPage: boolean;
}

const initialState: UIState = {
  isSignUpPage: true,
};


const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setSignUpPage: (state, action: PayloadAction<boolean>) => {
      state.isSignUpPage = action.payload;
    },
  },
});

export const { setSignUpPage } = uiSlice.actions;
export default uiSlice.reducer;
