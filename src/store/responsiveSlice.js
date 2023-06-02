import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: "",
};

export const responsiveSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setSizeScreen: (state, action) => ({
      ...state,
      screen: action.payload,
    }),
  },
});

export const { setSizeScreen } = responsiveSlice.actions;
export default responsiveSlice.reducer;
