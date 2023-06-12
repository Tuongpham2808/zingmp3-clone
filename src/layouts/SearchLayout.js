import React from "react";
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { menuSearch } from "../utils/menu";
import { v4 } from "uuid";

const SearchLayout = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  return (
    <div className="w-full">
      <div className="w-full textPrimary flex items-center border-b-[1px] border-[var(--bg-transparent1)]">
        <h2 className="text-2xl font-bold pr-5 border-r-[1px] border-[var(--bg-transparent1)]">
          Kết quả tìm kiếm
        </h2>
        <div className="flex items-center menuSearch">
          {menuSearch.length > 0 &&
            menuSearch.map((item) => (
              <div key={v4()} className="px-5">
                <NavLink
                  to={item?.url + "?q=" + searchParams.get("q")}
                  className={({ isActive }) =>
                    isActive
                      ? "isActive h-[47px] flex items-center justify-center"
                      : "h-[47px] flex items-center justify-center"
                  }
                >
                  <span>{item?.title}</span>
                </NavLink>
              </div>
            ))}
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default SearchLayout;
