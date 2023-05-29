import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  homeData: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getHome: (state, action) => ({
      ...state,
    }),
  },
});

export const { getHome } = homeSlice.actions;

export default homeSlice.reducer;
