// Logic of my user Redux

import { createSlice, current } from "@reduxjs/toolkit";

//Initial State
const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

// Handle Global State
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload; //user data is payload
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } = userSlice.actions; // Exporting

export default userSlice.reducer;
