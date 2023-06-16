import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  isPlaying: false,
  loading: false,
  curSongId: "ZOI6BFA9",
  dataCurSong: {},
  atAlbum: false,
  singleSong: false,
  listSongs: [],
  volumeAudio: 100,
  relatedsongs: [],
  listSongConcat: [],
  listPromote: [],
  randomSong: false,
  repeatSong: 0,
  pauseAlbum: false,
};

export const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {
    setIsPlaying: (state, action) => ({
      ...state,
      isPlaying: action.payload,
    }),
    setLoading: (state, action) => ({
      ...state,
      loading: action.payload,
    }),
    setCurSongId: (state, action) => ({
      ...state,
      curSongId: action.payload,
    }),
    setDataCurSong: (state, action) => ({
      ...state,
      dataCurSong: action.payload,
    }),
    setPlayAlbum: (state, action) => ({
      ...state,
      atAlbum: action.payload,
    }),
    setSingleSong: (state, action) => ({
      ...state,
      singleSong: action.payload,
    }),
    setListSongs: (state, action) => ({
      ...state,
      listSongs: action.payload,
    }),
    setVolumeAudio: (state, action) => ({
      ...state,
      volumeAudio: action.payload,
    }),
    setRelatedsong: (state, action) => ({
      ...state,
      relatedsongs: action.payload,
    }),
    setListSongConcat: (state, action) => ({
      ...state,
      listSongConcat: action.payload,
    }),
    setRandom: (state, action) => ({
      ...state,
      randomSong: action.payload,
    }),
    setRepeat: (state, action) => ({
      ...state,
      repeatSong: action.payload,
    }),
    setPauseAlbum: (state, action) => ({
      ...state,
      pauseAlbum: action.payload,
    }),
    setListPromote: (state, action) => ({
      ...state,
      listPromote: action.payload,
    }),
  },
});

export const {
  setIsPlaying,
  setCurSongId,
  setPlayAlbum,
  setListSongs,
  setVolumeAudio,
  setRelatedsong,
  setListSongConcat,
  setRandom,
  setRepeat,
  setPauseAlbum,
  setSingleSong,
  setListPromote,
  setLoading,
  setDataCurSong,
} = musicSlice.actions;
export default musicSlice.reducer;
