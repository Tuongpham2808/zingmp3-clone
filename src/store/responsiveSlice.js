import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  screen: "",
  isOpenSBR: false,
};

export const responsiveSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setSizeScreen: (state, action) => ({
      ...state,
      screen: action.payload,
    }),
    setToggleSBR: (state, action) => ({
      ...state,
      isOpenSBR: action.payload,
    }),
  },
  extraReducers: {},
});

export const { setSizeScreen, setToggleSBR } = responsiveSlice.actions;
export default responsiveSlice.reducer;
