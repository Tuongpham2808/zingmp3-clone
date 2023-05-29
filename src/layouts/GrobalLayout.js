import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import SidebarRight from "./SidebarRight";

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
      <div className="flex items-center w-full px-5 player-controlls hPlayControll bgPlayer">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1502174832274-bc176e52765a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
              alt=""
              className="object-cover w-16 h-16 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrobalLayout;
