import React from "react";
import ControllLeft from "./controllPlayer/ControllLeft";
import ControllPlayCenter from "./controllPlayer/ControllPlayCenter";
import ControllRight from "./controllPlayer/ControllRight";

const ControllPlayerWrap = () => {
  return (
    <div className="flex items-center w-full px-5 player-controlls overflow-hidden h-0 sm:h-[var(--height-playControll)] bgPlayer">
      <div className="flex items-center justify-between w-full h-full">
        {/* media left */}
        <ControllLeft></ControllLeft>
        {/* player controller */}
        <ControllPlayCenter></ControllPlayCenter>
        {/* player controller right */}
        <ControllRight></ControllRight>
      </div>
    </div>
  );
};

export default ControllPlayerWrap;
