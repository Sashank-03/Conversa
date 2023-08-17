// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    logInStatus: null,
    signUpStatus: null,
  },
  reducers: {
    setLogInStatus: (state, action) => {
      state.logInStatus = action.payload;
    },
    setSignUpStatus: (state, action) => {
      state.signUpStatus = action.payload;
    },
  },
});

export const { setLogInStatus, setSignUpStatus } = authSlice.actions;
export default authSlice.reducer;
