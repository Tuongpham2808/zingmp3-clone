import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";
import ControllPlayerWrap from "./ControllPlayerWrap";

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
      <ControllPlayerWrap></ControllPlayerWrap>
    </div>
  );
};

export default GrobalLayout;
