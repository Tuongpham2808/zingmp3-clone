import React from "react";
import { menu } from "../utils/menu";
import { Link, NavLink } from "react-router-dom";
import { v4 } from "uuid";
import { BiPlus } from "../utils/iconsOther";

const SidebarLeft = () => {
  return (
    <div className="relative flex flex-col h-full">
      <div className="h-[70px] pl-7 pr-6 flex items-center justify-start">
        <Link to="/">
          <img src="/Logo.svg" alt="" className="w-[120px] inline-block" />
        </Link>
      </div>
      <div className="flex flex-col mb-4">
        {menu.length > 0 &&
          menu.map((item) => (
            <NavLink
              to={item.url}
              key={v4()}
              className={({ isActive }) =>
                isActive
                  ? "isActive navSibarLeft flex gap-3 items-center py-3 px-5"
                  : "textSBL flex gap-3 items-center py-3 px-5 ml-[3px]"
              }
              onClick={item?.onClick}
            >
              <span>{item.icon}</span>
              <span className="text-sm font-semibold">{item.title}</span>
              <span>{item?.stream && item.stream}</span>
            </NavLink>
          ))}
      </div>
      <span className="sidebar-divide w-[80%] h-[1px] bgActive mx-5"></span>
      <div className="absolute bottom-0 left-0 right-0">
        <div className="textSBL bgSBL btActice h-[53px] flex gap-3 items-center py-3 px-5 ml-[3px]">
          <span>
            <BiPlus></BiPlus>
          </span>
          <span className="text-sm font-semibold">Tạo playlist mới</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
