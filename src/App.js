import { useSelector } from "react-redux";
import GrobalLayout from "./layouts/GrobalLayout";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ChartPage from "./pages/ChartPage";

function App() {
  const { homeData } = useSelector((state) => state.home);
  console.log(homeData);
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
