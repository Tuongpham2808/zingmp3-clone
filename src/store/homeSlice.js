import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../apis";

const initialState = {
  banner: [],
};
//redex thunk
export const handleFetchHome = createAsyncThunk(
  "home/handleFetchHome",
  async (thunkAPI) => {
    const response = await apis.getHomeAPI();
    const data = response.data.data.items.find(
      (item) => item.sectionId === "hSlider"
    );
    return data.items;
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getHome: (state, action) => ({
      ...state,
      banner: action.payload,
    }),
    setHome: (state, action) => ({
      ...state,
      banner: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleFetchHome.fulfilled, (state, action) => {
        state.banner = action.payload;
      })
      .addCase(handleFetchHome.pending, (state, action) => {})
      .addCase(handleFetchHome.rejected, (state, action) => {
        console.log("error fetch data banner");
      });
  },
});

export const { getHome, setHome } = homeSlice.actions;

export default homeSlice.reducer;
