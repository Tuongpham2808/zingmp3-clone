import GrobalLayout from "./layouts/GrobalLayout";
import { Route, Routes } from "react-router-dom";
import React, { Suspense, useEffect } from "react";
import useWindowSize from "./hooks/useWindowSize";
import { useDispatch } from "react-redux";
import { setSizeScreen } from "./store/responsiveSlice";

const HomePage = React.lazy(() => import("./pages/HomePage"));
const ChartPage = React.lazy(() => import("./pages/ChartPage"));

function App() {
  const [width] = useWindowSize();
  const dispatch = useDispatch();
  useEffect(() => {
    if (width >= 1280) {
      dispatch(setSizeScreen("xl"));
    }
    if (width >= 768 && width < 1280) {
      dispatch(setSizeScreen("md"));
    }
    if (width >= 300 && width < 768) {
      dispatch(setSizeScreen("sm"));
    }
  }, [dispatch, width]);
  return (
    <Suspense>
      <div className="bgMain">
        <Routes>
          <Route element={<GrobalLayout />}>
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
