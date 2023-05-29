import React from "react";
import { v4 } from "uuid";

const EmptyPlayList = () => {
  return (
    <div className="flex flex-col gap-[10px] p-5">
      {Array(5)
        .fill()
        .map((item) => (
          <div key={v4()} className="flex gap-[10px]">
            <span className="block w-10 h-10 rounded bgLoading"></span>
            <div className="flex flex-col flex-1 gap-[7px] pt-[2px]">
              <span className="w-full h-[10px] rounded bgLoading"></span>
              <span className="w-1/2 h-[10px] rounded bgLoading"></span>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EmptyPlayList;
