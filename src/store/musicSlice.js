import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isPlaying: false,
  curSongId: "6BAF7UOD",
  atAlbum: false,
  listSongs: [],
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => ({
      ...state,
      isPlaying: action.payload,
    }),
    setCurSongId: (state, action) => ({
      ...state,
      curSongId: action.payload,
    }),
    setPlayAlbum: (state, action) => ({
      ...state,
      atAlbum: action.payload,
    }),
    setListSongs: (state, action) => ({
      ...state,
      listSongs: action.payload,
    }),
  },
});

export const { setIsPlaying, setCurSongId, setPlayAlbum, setListSongs } =
  musicSlice.actions;
export default musicSlice.reducer;
