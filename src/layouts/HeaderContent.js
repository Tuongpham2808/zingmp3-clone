import React, { useState } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { IoSearchOutline } from "react-icons/io5";
import { LuTrendingUp } from "react-icons/lu";
import { SlSettings } from "react-icons/sl";
import { useNavigate } from "react-router-dom";
import { MyTooltip } from "../components";
import useWindowScroll from "../hooks/useWindowScroll";

const HeaderContent = () => {
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();
  const scroll = useWindowScroll(".mainContent");

  return (
    <div
      className={`px-[60px] h-[70px] flex items-center justify-between fixed top-0 right-0 left-[var(--width-sidebarLeft)] z-[1] bgMain opacity-95 ${
        scroll > 70 ? "shadowHeader" : ""
      }`}
    >
      <div className="flex items-center flex-1 gap-x-5">
        <button
          className="flex items-center flex-none textPrimary"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft className="w-5 h-5"></BsArrowLeft>
        </button>
        <button
          className="flex items-center flex-none textPrimary"
          onClick={() => navigate(+1)}
        >
          <BsArrowRight className="w-5 h-5"></BsArrowRight>
        </button>
        <div
          className={`relative max-w-[440px] flex-1 h-10 rounded-[20px] px-10 ${
            focus ? "bgFocus rounded-b-none" : "bgActive"
          }`}
        >
          <input
            type="text"
            name="search"
            placeholder="Tìm kiếm bài hát,nghệ sĩ,lời bài hát..."
            className="w-full h-full bgActive textSBL text-sm"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
          <span className="absolute flex items-center justify-center top-1/2 -translate-y-1/2 left-0 translate-x-1/2">
            <IoSearchOutline className="w-6 h-6 textSBL"></IoSearchOutline>
          </span>
          {focus && (
            <ul className="absolute w-full left-0 top-9 flex flex-col items-center px-[10px] py-[13px] bgFocus textPrimary rounded-b-[20px]">
              <h3 className="text-sm w-full font-bold pb-2 px-[10px]">
                Đề xuất cho bạn
              </h3>
              {Array(6)
                .fill(null)
                .map((item) => (
                  <div className="w-full py-2 px-[10px] flex items-center gap-x-[10px]">
                    <LuTrendingUp className="textSBL w-4 h-4"></LuTrendingUp>
                    <p>Em bé</p>
                  </div>
                ))}
            </ul>
          )}
        </div>
      </div>
      <div className="flex items-center flex-none gap-x-[10px]">
        <span className="w-10 h-10 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full bg-[var(--bg-active)] hover:opacity-80">
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

export default HeaderContent;
