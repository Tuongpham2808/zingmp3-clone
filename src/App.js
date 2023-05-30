import { useDispatch, useSelector } from "react-redux";
import GrobalLayout from "./layouts/GrobalLayout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChartPage from "./pages/ChartPage";
import { useEffect } from "react";
import { handleFetchHome } from "./store/homeSlice";

function App() {
  const { banner } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(handleFetchHome());
  }, []);
  // console.log(banner);

  return (
    <div className="bgMain">
      <Routes>
        <Route element={<GrobalLayout />}>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/zing-chart" element={<ChartPage />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
