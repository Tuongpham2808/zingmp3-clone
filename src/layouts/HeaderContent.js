import React from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { SlSettings } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import useWindowScroll from "../hooks/useWindowScroll";
import { memo } from "react";
import InputSeach from "./InputSeach";
import MyTooltip from "../components/MyTooltip";
import { useSelector } from "react-redux";

const HeaderContent = () => {
  const navigate = useNavigate();
  const scroll = useWindowScroll(".mainContent");
  const { isOpenSBR } = useSelector((state) => state.screen);
  return (
    <div
      className={`lg:px-[60px] px-6 h-[70px] flex items-center justify-between fixed top-0 right-0 left-0 sm:left-[70px] lg:left-[var(--width-sidebarLeft)] bgMain ${
        scroll > 70 ? "shadowHeader" : ""
      } ${isOpenSBR ? "z-10" : "z-30"}`}
    >
      <div className="flex items-center flex-1 gap-x-5 mr-[10px]">
        <button
          className="hidden items-center flex-none textPrimary xs:flex"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft className="w-5 h-5"></BsArrowLeft>
        </button>
        <button
          className="hidden items-center flex-none textPrimary xs:flex"
          onClick={() => navigate(+1)}
        >
          <BsArrowRight className="w-5 h-5"></BsArrowRight>
        </button>
        <InputSeach></InputSeach>
      </div>
      <div className="flex items-center flex-none gap-x-[10px]">
        <span className="w-10 h-10 p-[3px] mx-[2px] hidden xs:flex items-center justify-center textPrimary rounded-full bg-[var(--bg-active)] hover:opacity-80">
          <MyTooltip placeholder="Cài đặt" offset={20}>
            <SlSettings className="w-5 h-5"></SlSettings>
          </MyTooltip>
        </span>
        <span className="w-10 h-10 rounded-full overflow-hidden hover:opacity-80">
          <img
            src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
        </span>
      </div>
    </div>
  );
};

export default memo(HeaderContent);
