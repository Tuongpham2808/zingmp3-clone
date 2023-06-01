import React from "react";
import MyTooltip from "./MyTooltip";
import { HiOutlineHeart } from "react-icons/hi";
import { IoPlay } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";

const ImageMedia = ({ thumbnail = "", isPlaying = false, tyle }) => {
  let styles = {
    btnOther: false,
    btnPlay: true,
    circleStroke: false,
    sizePlay: "w-5 h-5",
    zoom: true,
  };
  switch (tyle) {
    case "small":
      styles = {
        ...styles,
        zoom: false,
      };
      break;
    case "normal":
      styles = {
        ...styles,
        zoom: false,
      };
      break;
    case "medium":
      styles = {
        ...styles,
        btnOther: true,
        circleStroke: true,
        sizePlay: "w-7 h-7",
      };
      break;
    case "large":
      styles = {
        ...styles,
        circleStroke: true,
        sizePlay: "w-7 h-7",
      };
      break;
    case "none":
      styles = {
        ...styles,
        btnPlay: false,
        zoom: false,
      };
      break;
    default:
      break;
  }

  return (
    <>
      <div className="relative flex-none w-full overflow-hidden rounded group">
        <span className="w-full h-0 pb-[100%]">
          <img
            src={thumbnail}
            alt=""
            className="object-cover w-full h-auto rounded transition1 group-hover:scale-110"
          />
        </span>
        {styles.btnPlay && (
          <span className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black rounded opacity-0 cursor-pointer group-hover:opacity-100 hover:opacity-100 bg-opacity-40">
            <div className="flex items-center w-full justify-evenly">
              {styles.btnOther && (
                <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-transparent1)]">
                  <MyTooltip placeholder="Thêm vào thư viện" offset={20}>
                    <HiOutlineHeart
                      className={styles.sizePlay}
                    ></HiOutlineHeart>
                  </MyTooltip>
                </span>
              )}
              <span
                className={`w-[45px] h-[45px] p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full ${
                  styles.circleStroke ? "border-[1px]" : ""
                }`}
              >
                <IoPlay className={styles.sizePlay}></IoPlay>
              </span>
              {styles.btnOther && (
                <span className="w-8 h-8 p-[3px] mx-[2px] flex items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-transparent1)]">
                  <MyTooltip placeholder="Khác" offset={20}>
                    <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
                  </MyTooltip>
                </span>
              )}
            </div>
          </span>
        )}
      </div>
    </>
  );
};

export default ImageMedia;
