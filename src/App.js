import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import Modal from "./components/Modal";
import LoadingPage from "./pages/LoadingPage";

const GlobalLayout = React.lazy(() => import("./layouts/GlobalLayout"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ChartPage = React.lazy(() => import("./pages/ChartPage"));
const AlbumPage = React.lazy(() => import("./pages/AlbumPage"));
const SearchLayout = React.lazy(() => import("./layouts/SearchLayout"));
const SearchAllPage = React.lazy(() => import("./pages/SearchAllPage"));
const SearchSongPage = React.lazy(() => import("./pages/SearchSongPage"));
const SearchArtistPage = React.lazy(() => import("./pages/SearchArtistPage"));
const SearchVideoPage = React.lazy(() => import("./pages/SearchVideoPage"));
const SearchPlaylistPage = React.lazy(() =>
  import("./pages/SearchPlaylistPage")
);

function App() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="bgMain">
        <Modal></Modal>
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/zing-chart" element={<ChartPage />}></Route>
            <Route path="/album/:title/:pid" element={<AlbumPage />}></Route>
            <Route path="/playlist/:title/:pid" element={<AlbumPage />}></Route>
            <Route path="/bai-hat/:title/:pid" element={<AlbumPage />}></Route>
            <Route path="/tim-kiem" element={<SearchLayout />}>
              <Route path="tat-ca" element={<SearchAllPage />}></Route>
              <Route path="bai-hat" element={<SearchSongPage />}></Route>
              <Route path="playlist" element={<SearchPlaylistPage />}></Route>
              <Route path="artist" element={<SearchArtistPage />}></Route>
              <Route path="video" element={<SearchVideoPage />}></Route>
            </Route>
            <Route path="*" element={<HomePage />}></Route>
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
