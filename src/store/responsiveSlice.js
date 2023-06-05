import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenSBR: false,
};

export const responsiveSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setToggleSBR: (state, action) => ({
      ...state,
      isOpenSBR: action.payload,
    }),
  },
  extraReducers: {},
});

export const { setToggleSBR } = responsiveSlice.actions;
export default responsiveSlice.reducer;
