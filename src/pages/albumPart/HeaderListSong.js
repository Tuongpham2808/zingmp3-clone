import React from "react";
import { MdLibraryMusic } from "react-icons/md";

const HeaderListSong = () => {
  return (
    <div className="p-[10px] flex items-center textSecondary2">
      <div className="flex items-center gap-x-[10px] flex-1">
        <span className="h-5">
          <MdLibraryMusic className="w-4 h-4"></MdLibraryMusic>
        </span>
        <span className="uppercase text-sm font-medium">Bài hát</span>
      </div>
      <div className="flex-1 flex items-center justify-between">
        <span className="uppercase opacity-0 md:opacity-100 text-sm font-medium">
          Album
        </span>
        <span className="uppercase opacity-0 xs:opacity-100 text-sm font-medium">
          Thời gian
        </span>
      </div>
    </div>
  );
};

export default HeaderListSong;
