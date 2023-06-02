import { combineReducers, configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import responsiveSlice from "./responsiveSlice";

const reducer = combineReducers({
  home: homeSlice,
  screen: responsiveSlice,
});

export const store = configureStore({
  reducer: reducer,
});

export default store;
