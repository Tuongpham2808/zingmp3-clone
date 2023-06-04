import React from "react";
import MyTooltip from "./MyTooltip";
import { HiOutlineHeart } from "react-icons/hi";
import { IoPlay } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";
import PlayingIcon from "../utils/iconsOther/PlayingIcon";
import { useSelector } from "react-redux";

const ImageMedia = ({
  image = "",
  tyle = "medium",
  classImage = "w-full h-auto",
  title = "",
  id = "",
  onClick = () => {},
}) => {
  const { curSongId, isPlaying } = useSelector((state) => state.music);
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
      <div
        className={`relative flex-none overflow-hidden rounded group  ${classImage}`}
        title={title}
        onClick={onClick}
      >
        <span className={`h-0 pb-[100%] ${classImage}`}>
          <img
            src={image}
            alt=""
            className={`object-cover rounded transition1 ${
              styles.zoom ? "group-hover:scale-110" : ""
            } ${classImage}`}
          />
        </span>
        {styles.btnPlay && (
          <span
            className={`absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black rounded opacity-0 cursor-pointer group-hover:opacity-100 hover:opacity-100 bg-opacity-40 ${classImage} ${
              curSongId === id ? "opacity-100" : ""
            }`}
          >
            <div className="flex items-center w-full justify-evenly">
              {styles.btnOther && (
                <span className="w-8 h-8 p-[3px] mx-[2px] lg:flex hidden items-center justify-center textPrimary rounded-full hover:bg-[var(--bg-transparent1)]">
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
                {curSongId === id && isPlaying ? (
                  <PlayingIcon className={styles.sizePlay} />
                ) : (
                  <IoPlay className={styles.sizePlay} />
                )}
              </span>
              {styles.btnOther && (
                <span className="w-8 h-8 p-[3px] mx-[2px] lg:flex items-center hidden justify-center textPrimary rounded-full hover:bg-[var(--bg-transparent1)]">
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
