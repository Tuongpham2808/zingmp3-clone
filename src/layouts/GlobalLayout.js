import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import ControllPlayerWrap from "./ControllPlayerWrap";
import SidebarRight from "./SidebarRight";
import HeaderContent from "./HeaderContent";
import { useSelector } from "react-redux";

const GlobalLayout = () => {
  const { isOpenSBR } = useSelector((state) => state.screen);
  const { listSongs, isPlaying } = useSelector((state) => state.music);
  console.log("re-render");

  return (
    <div className="h-screen">
      <HeaderContent></HeaderContent>
      <div
        className={`relative flex w-full transition-all ${
          listSongs.length > 0 || isPlaying
            ? "sm:h-[calc(100vh-var(--height-playControll))]"
            : "sm:h-full"
        }`}
      >
        <div className="stroke-slate-500 flex-none w-[240px] bgSBL hidden sm:block">
          <SidebarLeft></SidebarLeft>
        </div>
        <div className="w-full overflow-hidden transition1 mr-[var(--margin-contentRight)]">
          <div className="w-full h-auto">
            <div className="md:px-[60px] px-6 overflow-x-hidden overflow-y-scroll h-screen hiddenScroll mainContent scroll-smooth">
              <div className="mt-[70px] max-w-[1442px] mx-auto pb-[120px] md:overflow-x-hidden">
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bgMain blActice slideRight w-[var(--margin-SidebarRight)] overflow-hidden transition-all stroke-slate-500 flex-none h-full absolute right-0 top-0 bottom-0 z-[2] ${
            !isOpenSBR ? "translate-x-full opacity-0" : "opacity-100"
          }`}
        >
          <SidebarRight></SidebarRight>
        </div>
      </div>
      {listSongs.length > 0 || isPlaying ? (
        <div
          className={`transition-all ${
            listSongs.length > 0 || isPlaying
              ? ""
              : "translate-y-full opacity-0"
          }`}
        >
          <ControllPlayerWrap></ControllPlayerWrap>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default GlobalLayout;
