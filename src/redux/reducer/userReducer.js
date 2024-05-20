import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_details: {},
};

export const userReducer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setUserReducer(state, action) {
      state.user_details = action.payload;
    },
  },
});

export const { setUserReducer } = userReducer.actions;

export default userReducer.reducer;
