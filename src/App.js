import GrobalLayout from "./layouts/GrobalLayout";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ChartPage = React.lazy(() => import("./pages/ChartPage"));

function App() {
  return (
    <Suspense>
      <div className="bgMain">
        <Routes>
          <Route element={<GrobalLayout />}>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/zing-chart" element={<ChartPage />}></Route>
          </Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
