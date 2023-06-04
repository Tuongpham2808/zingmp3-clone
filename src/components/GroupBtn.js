import React from "react";

const GroupBtn = ({ children }) => {
  return (
    <span className="w-8 h-8 p-[3px] mx-[7px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-active)]">
      {children}
    </span>
  );
};

export default GroupBtn;
