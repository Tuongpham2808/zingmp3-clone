import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { persistor, store } from "./store/configureStore";
import { BrowserRouter } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalLayout from "./layouts/GlobalLayout";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate loading={<GlobalLayout />} persistor={persistor}>
        <App />
      </PersistGate>
      {/* <Tooltip anchorSelect=".my-tooltip" className="!text-xs" /> */}
    </BrowserRouter>
    <ToastContainer
      progressClassName="toastProgress"
      bodyClassName="toastBody"
    ></ToastContainer>
  </Provider>
  // </React.StrictMode>
);
reportWebVitals();
