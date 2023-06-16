import React from "react";
import { Outlet } from "react-router-dom";
import SidebarLeft from "./SidebarLeft";
import ControllPlayerWrap from "./ControllPlayerWrap";
import SidebarRight from "./SidebarRight";
import HeaderContent from "./HeaderContent";
import { useSelector } from "react-redux";
import NavigateMobileWrap from "./NavigateMobileWrap";
import ControllPlayerWrapMobile from "./ControllPlayerWrapMobile";

const GlobalLayout = () => {
  const { isOpenSBR } = useSelector((state) => state.screen);
  const { isPlaying, listSongs } = useSelector((state) => state.music);

  return (
    <div className="h-screen w-full relative select-none">
      <HeaderContent></HeaderContent>
      <div
        className={`relative flex w-full transition-all overflow-hidden h-[calc(100vh-var(--height-playControll))] ${
          listSongs.length > 0 || isPlaying
            ? "sm:h-[calc(100vh-var(--height-playControll))]"
            : "sm:h-full"
        }`}
      >
        <div className="stroke-slate-500 flex-none lg:w-[240px] w-[70px] bgSBL hidden sm:block">
          <SidebarLeft></SidebarLeft>
        </div>
        <div className="w-full overflow-hidden transition1 mr-[var(--margin-contentRight)]">
          <div className="w-full h-auto">
            <div className="md:px-[60px] sm:px-6 px-2 xs:px-4 overflow-x-hidden overflow-y-scroll h-screen hiddenScroll mainContent scroll-smooth">
              <div
                className={`mt-[70px] max-w-[1442px] mx-auto sm:pb-[120px] ${
                  listSongs?.length > 0 || isPlaying ? "pb-[170px]" : ""
                }`}
              >
                <Outlet></Outlet>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`bgMain fixed top-0 right-0 bottom-[var(--height-playControll)] transitionAll sm:border-l-[1px] sm:border-[var(--bg-active)] w-full sm:w-[var(--margin-SidebarRight)] overflow-hidden stroke-slate-500 flex-none h-[calc(100vh-var(--height-playControll))] z-20 ${
            isOpenSBR
              ? "left-0 sm:left-[var(--left-SidebarRight)] opacity-100"
              : "left-full opacity-0"
          }`}
        >
          <SidebarRight></SidebarRight>
        </div>
      </div>
      <NavigateMobileWrap></NavigateMobileWrap>
      {listSongs.length > 0 || isPlaying ? (
        <div
          className={`transition-all z-50 ${
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
      <ControllPlayerWrapMobile></ControllPlayerWrapMobile>
    </div>
  );
};

export default GlobalLayout;
