import React from "react";
import { Outlet } from "react-router-dom";

const SearchLayout = () => {
  return (
    <div>
      Search
      <Outlet></Outlet>
    </div>
  );
};

export default SearchLayout;
