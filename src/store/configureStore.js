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

const rootReducer = combineReducers({
  home: homeSlice,
  screen: responsiveSlice,
  music: musicSlice,
});

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["home", "screen"],
  stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
};
const pReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: pReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
