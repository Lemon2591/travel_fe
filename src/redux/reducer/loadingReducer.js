import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isLoadingElement: false,
};

export const loadingReducer = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoadingReducer(state, action) {
      state.isLoading = action.payload;
    },

    setLoadingElementReducer(state, action) {
      state.isLoadingElement = action.payload;
    },
  },
});

export const { setLoadingReducer, setLoadingElementReducer } =
  loadingReducer.actions;

export default loadingReducer.reducer;
