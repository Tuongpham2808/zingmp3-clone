import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenSBR: false,
  isOpenPlaySongMobile: false,
};

export const responsiveSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setToggleSBR: (state, action) => ({
      ...state,
      isOpenSBR: action.payload,
    }),
    setTogglePlaySongMobile: (state, action) => ({
      ...state,
      isOpenPlaySongMobile: action.payload,
    }),
  },
  extraReducers: {},
});

export const { setToggleSBR, setTogglePlaySongMobile } =
  responsiveSlice.actions;
export default responsiveSlice.reducer;
