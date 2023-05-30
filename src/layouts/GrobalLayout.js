import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import ControllPlayerWrap from "./ControllPlayerWrap";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";

const GrobalLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen">
      <div className="relative flex w-full hMain">
        <div className="stroke-slate-500 flex-none w-[240px] bgSBL">
          <SidebarLeft></SidebarLeft>
        </div>
        <div className="flex-auto overflow-auto stroke-slate-500">
          <div className="px-[60px] h-[70px] flex items-center justify-between">
            <div className="flex items-center flex-1 gap-x-5">
              <button
                className="flex items-center flex-none textPrimary"
                onClick={() => navigate(-1)}
              >
                <HiArrowLeft className="w-5 h-5"></HiArrowLeft>
              </button>
              <button
                className="flex items-center flex-none textPrimary"
                onClick={() => navigate(1)}
              >
                <HiArrowRight className="w-5 h-5"></HiArrowRight>
              </button>
              <div className="max-w-[440px] flex-1 h-10 rounded-full bgActive">
                <input
                  type="text"
                  name="search"
                  className="w-full h-full rounded-full bgActive"
                />
              </div>
            </div>
          </div>
          <Outlet></Outlet>
        </div>
        <div className="bgMain blActice stroke-slate-500 flex-none w-[330px] h-full absolute right-0 top-0 bottom-0">
          <SidebarRight></SidebarRight>
        </div>
      </div>
      <ControllPlayerWrap></ControllPlayerWrap>
    </div>
  );
};

export default GrobalLayout;
