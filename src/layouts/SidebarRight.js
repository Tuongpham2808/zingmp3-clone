import React from "react";
import SiderbarNewList from "./sibarRightPart/SidebarNewList";
import EmptyPlayList from "./sibarRightPart/EmptyPlayList";
import SidebarHeader from "./sibarRightPart/SidebarHeader";

const SidebarRight = () => {
  return (
    <div className="relative h-full">
      <SidebarHeader></SidebarHeader>
      <div>
        <EmptyPlayList></EmptyPlayList>
      </div>
      <div className="absolute -translate-y-1/2 top-1/2">
        <SiderbarNewList></SiderbarNewList>
      </div>
    </div>
  );
};

export default SidebarRight;
