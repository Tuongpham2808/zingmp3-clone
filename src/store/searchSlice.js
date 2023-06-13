import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../apis";

const initialState = {
  dataSearch: {},
  dataSearchSuggest: [],
  zingchartData: [],
};

//redex thunk
export const handleFetchSearch = createAsyncThunk(
  "home/handleFetchHome",
  async (thunkAPI) => {
    try {
      let response = await apis.getHomeAPI();
      let data = response.data.data.items;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setDataSearch: (state, action) => ({
      ...state,
      dataSearch: action.payload,
    }),
    setDataSearchSuggest: (state, action) => ({
      ...state,
      dataSearchSuggest: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(handleFetchSearch.fulfilled, (state, action) => {
      state.zingchartData = action.payload.find(
        (item) => item.sectionId === "hZC"
      )?.items;
    });
  },
});

export const { setDataSearch, setDataSearchSuggest } = searchSlice.actions;
export default searchSlice.reducer;
