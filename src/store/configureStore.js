import { combineReducers, configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";

const reducer = combineReducers({
  home: homeSlice,
});

export const store = configureStore({
  reducer: reducer,
});

export default store;
