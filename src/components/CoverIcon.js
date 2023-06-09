import React from "react";
import MyTooltip from "./MyTooltip";

const CoverIcon = ({ children, placeholder = "" }) => {
  return (
    <span className="w-[38px] h-[38px] p-[3px] mx-[2px] flex items-center justify-center cursor-pointer textPrimary rounded-full hover:bg-[var(--bg-transparent1)]">
      <MyTooltip placeholder={placeholder} offset={20}>
        {children}
      </MyTooltip>
    </span>
  );
};

export default CoverIcon;
