import React from "react";
import { FiMoreHorizontal, TfiAlarmClock } from "../../utils/iconsOther";
import useToggle from "../../hooks/useToggle";
import CoverIcon from "../../components/CoverIcon";

const SidebarHeader = () => {
  const { handleToggle, toggle } = useToggle();

  return (
    <div className="py-[14px] w-full h-[70px] flex items-center justify-between gap-1 px-2 fixed top-0 left-0 right-0 z-10 bgMain">
      <div className="flex items-center h-[42px]">
        <div className="bgActive w-[227px] h-[34px] p-[3px] rounded-full flex items-center">
          <div
            className={`w-auto h-full text-xs font-bold rounded-full textSBL py-[5px] flex items-center justify-center flex-auto cursor-pointer select-none ${
              toggle ? "bgActive2" : ""
            }`}
            onClick={handleToggle}
          >
            Danh sách phát
          </div>
          <div
            className={`w-auto h-full text-xs rounded-full textSBL py-[5px] flex items-center justify-center flex-auto cursor-pointer select-none ${
              !toggle ? "bgActive2" : ""
            }`}
            onClick={handleToggle}
          >
            Nghe gần đây
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <CoverIcon
          className="w-8 h-8 btnDisable btn-more"
          placeholder="Hẹn giờ dừng phát nhạc"
        >
          <TfiAlarmClock className="w-5 h-5"></TfiAlarmClock>
        </CoverIcon>
        <CoverIcon className="w-8 h-8 btnDisable btn-more" placeholder="Khác">
          <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
        </CoverIcon>
      </div>
    </div>
  );
};

export default SidebarHeader;
