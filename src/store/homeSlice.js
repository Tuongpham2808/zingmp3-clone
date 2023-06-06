import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from "../apis";
import { store } from "./configureStore";

const initialState = {
  banneData: [],
  newReleaseData: {},
  chillData: [],
  energyData: [],
  trendArtistData: [],
  rankReleaseData: [],
  chartReleaseData: [],
  weekChartData: [],
  top100Data: [],
  albumHotData: [],
};
//redex thunk
export const handleFetchHome = createAsyncThunk(
  "home/handleFetchHome",
  async (thunkAPI) => {
    try {
      let response = await apis.getHomeAPI();
      let data = response.data.data.items;
      console.log(data);
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
    setHome: (state, action) => ({
      ...state,
      homeData: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(handleFetchHome.fulfilled, (state, action) => {
      state.banneData = action.payload.find(
        (item) => item.sectionType === "banner"
      )?.items;
      state.newReleaseData = action.payload.find(
        (item) => item.sectionType === "new-release"
      )?.items;
      state.chillData = action.payload.find(
        (item) => item.sectionId === "hEditorTheme"
      )?.items;
      state.energyData = action.payload.find(
        (item) => item.sectionId === "hEditorTheme2"
      )?.items;
      state.trendArtistData = action.payload.find(
        (item) => item.sectionId === "hArtistTheme"
      )?.items;
      state.rankReleaseData = action.payload.find(
        (item) => item.sectionId === "hNewrelease"
      )?.items;
      state.chartReleaseData = action.payload.find(
        (item) => item.sectionId === "hNewrelease"
      )?.chart;
      state.weekChartData = action.payload.find(
        (item) => item.sectionType === "weekChart"
      )?.items;
      state.top100Data = action.payload.find(
        (item) => item.sectionId === "h100"
      )?.items;
      state.albumHotData = action.payload.find(
        (item) => item.sectionId === "hAlbum"
      )?.items;
    });
  },
});

export const { getHome, setHome } = homeSlice.actions;

export default homeSlice.reducer;
