import { combineReducers, configureStore } from "@reduxjs/toolkit";
import homeSlice from "./homeSlice";
import responsiveSlice from "./responsiveSlice";
import musicSlice from "./musicSlice";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: [
    "isPlaying",
    "listSongs",
    "relatedsongs",
    "atAlbum",
    "listSongConcat",
  ],
  stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
};
const pReducer = persistReducer(persistConfig, musicSlice);
const rootReducer = combineReducers({
  home: homeSlice,
  screen: responsiveSlice,
  music: pReducer,
});
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
