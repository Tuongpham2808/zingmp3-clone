import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../apis";
import { store } from "./configureStore";

const initialState = {
  homeData: [],
};
//redex thunk
export const handleFetchHome = createAsyncThunk(
  "home/handleFetchHome",
  async (thunkAPI) => {
    try {
      let response = await apis.getHomeAPI();
      let data = response.data.data.items;
      // store.dispatch(setHome(data));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    getHome: (state, action) => ({
      ...state,
      homeData: action.payload,
    }),
    setHome: (state, action) => ({
      ...state,
      homeData: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(handleFetchHome.fulfilled, (state, action) => {
      state.homeData = action.payload;
    });
  },
});

export const { getHome, setHome } = homeSlice.actions;

export default homeSlice.reducer;
