import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isPlaying: false,
  curSongId: "ZOI6BFA9",
  atAlbum: true,
  listSongs: [],
  volumeAudio: 100,
  relatedsongs: [],
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
    setVolumeAudio: (state, action) => ({
      ...state,
      volumeAudio: action.payload,
    }),
    SetRelatedsong: (state, action) => ({
      ...state,
      relatedsongs: action.payload,
    }),
  },
});

export const {
  setIsPlaying,
  setCurSongId,
  setPlayAlbum,
  setListSongs,
  setVolumeAudio,
  SetRelatedsong,
} = musicSlice.actions;
export default musicSlice.reducer;
