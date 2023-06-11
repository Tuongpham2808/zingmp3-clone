import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import GlobalLayout from "./layouts/GlobalLayout";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ChartPage = React.lazy(() => import("./pages/ChartPage"));
const AlbumPage = React.lazy(() => import("./pages/AlbumPage"));
const SearchAllPage = React.lazy(() => import("./pages/SearchAllPage"));
const SearchLayout = React.lazy(() => import("./layouts/SearchLayout"));

function App() {
  return (
    <Suspense>
      <div className="bgMain">
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/zing-chart" element={<ChartPage />}></Route>
            <Route path="/album/:title/:pid" element={<AlbumPage />}></Route>
            <Route path="/playlist/:title/:pid" element={<AlbumPage />}></Route>
            <Route path="/bai-hat/:title/:pid" element={<AlbumPage />}></Route>
            <Route path="/tim-kiem" element={<SearchLayout />}>
              <Route path="tat-ca" element={<SearchAllPage />}></Route>
              <Route path="bai-hat" element={<SearchAllPage />}></Route>
              <Route path="playlist" element={<SearchAllPage />}></Route>
              <Route path="artist" element={<SearchAllPage />}></Route>
              <Route path="video" element={<SearchAllPage />}></Route>
            </Route>
            <Route path="*" element={<HomePage />}></Route>
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
