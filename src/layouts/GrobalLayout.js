import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import ControllPlayerWrap from "./ControllPlayerWrap";
import SidebarRight from "./SidebarRight";
import HeaderContent from "./HeaderContent";

const GrobalLayout = () => {
  // const [width, height] = useWindowSize();
  // console.log(width);

  return (
    <div className="h-screen">
      <HeaderContent></HeaderContent>
      <div className="relative flex w-full hMain">
        <div className="stroke-slate-500 flex-none w-[240px] bgSBL">
          <SidebarLeft></SidebarLeft>
        </div>
        <div className="w-full overflow-auto hiddenScroll">
          <div className="w-full">
            <div className="px-[60px] overflow-x-hidden overflow-y-scroll h-screen hiddenScroll mainContent">
              <div className="mt-[70px] max-w-[1442px] mx-auto">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
        <div className="bgMain hidden blActice stroke-slate-500 flex-none widthSBR h-full absolute right-0 top-0 bottom-0 z-[2]">
          <SidebarRight></SidebarRight>
        </div>
      </div>
      <ControllPlayerWrap></ControllPlayerWrap>
    </div>
  );
};

export default GrobalLayout;
