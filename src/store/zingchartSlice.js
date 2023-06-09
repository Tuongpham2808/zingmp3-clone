import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as apis from "../apis";

const initialState = {
  zingchartData: [],
  rankchartData: {},
  promotes: [],
  weekChartData: {},
};

export const handleGetZingchart = createAsyncThunk(
  "zingchart/handleGetZingchart",
  async (thunkAPI) => {
    try {
      let response = await apis.getNewReleaseChart();
      let data = response?.data?.data;
      // console.log(data?.weekChart);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const zingchartSlice = createSlice({
  name: "zingchart",
  initialState,
  reducers: {
    setZingchart: (state, action) => ({
      ...state,
      chart: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(handleGetZingchart.fulfilled, (state, action) => {
      state.zingchartData = action.payload?.RTChart?.items;
      state.rankchartData = action.payload?.RTChart?.chart;
      state.promotes = action.payload?.RTChart?.promotes;
      state.weekChartData = action.payload?.weekChart;
    });
  },
});
export const { setZingchart } = zingchartSlice.actions;

export default zingchartSlice.reducer;
