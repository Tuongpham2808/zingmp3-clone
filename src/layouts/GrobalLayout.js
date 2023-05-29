import React from "react";
import { Link, Outlet } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import { Like, More } from "../utils/iconsOther";
import { Tooltip } from "react-tooltip";
import MyTooltip from "../components/MyTooltip";

const GrobalLayout = () => {
  return (
    <div className="h-screen">
      <div className="relative flex w-full hMain">
        <div className="stroke-slate-500 flex-none w-[240px] bgSBL">
          <SidebarLeft></SidebarLeft>
        </div>
        <div className="flex-auto overflow-auto stroke-slate-500">
          <Outlet></Outlet>
        </div>
        <div className="bgMain blActice stroke-slate-500 flex-none w-[330px] h-full absolute right-0 top-0 bottom-0">
          <SidebarRight></SidebarRight>
        </div>
      </div>
      <div className="flex items-center w-full px-5 cursor-pointer player-controlls hPlayControll bgPlayer">
        <div className="flex items-center justify-between">
          {/* media left */}
          <div className="flex items-center gap-[10px]">
            <img
              src="https://images.unsplash.com/photo-1502174832274-bc176e52765a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt=""
              className="object-cover w-16 h-16 rounded"
            />
            <div>
              <Link to="" className="text-sm font-medium textPrimary">
                Kẻ Viết Ngôn Tình
              </Link>
              <span className="block text-xs">
                <Link
                  to=""
                  className="inline-block font-semibold textSecondary"
                >
                  Châu khải phong
                </Link>
                <p className="inline-block font-medium textSecondary">, </p>
                <Link
                  to=""
                  className="inline-block font-semibold textSecondary"
                >
                  ACV
                </Link>
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
                <MyTooltip placeholder="Thêm vào thư viện">
                  <Like></Like>
                </MyTooltip>
              </span>
              <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
                <MyTooltip placeholder="Xem thêm">
                  <More></More>
                </MyTooltip>
              </span>
            </div>
          </div>
          {/* player controller */}
          {/* player controller right */}
        </div>
      </div>
    </div>
  );
};

export default GrobalLayout;
