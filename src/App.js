import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";
import GlobalLayout from "./layouts/GlobalLayout";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ChartPage = React.lazy(() => import("./pages/ChartPage"));

function App() {
  return (
    <Suspense>
      <div className="bgMain">
        <Routes>
          <Route element={<GlobalLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/zing-chart" element={<ChartPage />}></Route>
            <Route path="*" element={<HomePage />}></Route>
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
