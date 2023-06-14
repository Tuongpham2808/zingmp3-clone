import React from "react";
import { menu } from "../utils/menu";
import { Link, NavLink } from "react-router-dom";
import { v4 } from "uuid";
import { BiPlus } from "../utils/iconsOther";
import { toast } from "react-toastify";

const SidebarLeft = () => {
  return (
    <div className="relative flex flex-col lg:w-full w-[70px] h-full">
      <div className="h-[70px] w-[70px] lg:w-full lg:pl-7 lg:pr-6 flex items-center justify-center lg:justify-start">
        <Link to="/">
          <img
            src="/Logo.svg"
            alt=""
            className="w-[120px] hidden lg:inline-block "
          />
          <img
            src="/Logo2.svg"
            alt=""
            className="w-[45px] lg:hidden inline-block"
          />
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
              <span className="text-sm font-semibold hidden lg:inline-block">
                {item.title}
              </span>
              <span className=" hidden lg:inline-block">
                {item?.stream && item.stream}
              </span>
            </NavLink>
          ))}
      </div>
      <span className="sidebar-divide w-1/2 lg:w-4/5 h-[1px] bgActive mx-auto"></span>
      <div className="absolute bottom-0 left-0 right-0">
        <div
          className="textSBL bgSBL btActice h-[53px] flex gap-3 items-center justify-center py-3 px-5 ml-[3px] cursor-pointer"
          onClick={() => toast.warning("Chức năng này chưa được phát triển")}
        >
          <span className="w-6 h-6 flex items-center justify-center bgTrans2 rounded-lg">
            <BiPlus className="w-6 h-6"></BiPlus>
          </span>
          <span className="text-sm font-semibold hidden lg:inline-block">
            Tạo playlist mới
          </span>
        </div>
      </div>
    </div>
  );
};

export default SidebarLeft;
