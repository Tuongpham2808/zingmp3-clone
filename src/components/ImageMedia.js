import React from "react";
import MyTooltip from "./MyTooltip";
import { HiOutlineHeart } from "react-icons/hi";
import { IoPlay, IoShuffleOutline } from "react-icons/io5";
import { FiMoreHorizontal } from "react-icons/fi";
import PlayingIcon from "../utils/iconsOther/PlayingIcon";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ImageMedia = ({
  image = "",
  tyle = "medium",
  classImage = "w-full h-auto",
  title = "",
  id = "",
  onClick = () => {},
  link = "#",
  idRandom = "",
  isPlaylist = false,
}) => {
  const { curSongId, isPlaying, atAlbum } = useSelector((state) => state.music);
  let styles = {
    btnOther: false,
    btnPlay: true,
    btnBuffer: false,
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
    case "searchArtist":
      styles = {
        ...styles,
        btnBuffer: true,
        sizePlay: "w-6 h-6",
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
    <Link
      to={link}
      onClick={link === "# " ? (e) => e.preventDefault() : () => {}}
    >
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
        {styles.btnPlay && !isPlaylist && (
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
                {(curSongId === id && isPlaying) ||
                (curSongId === idRandom && atAlbum && isPlaying) ? (
                  <PlayingIcon className={styles.sizePlay} />
                ) : !styles.btnBuffer ? (
                  <IoPlay className={styles.sizePlay} />
                ) : (
                  <IoShuffleOutline className={styles.sizePlay} />
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
    </Link>
  );
};

export default ImageMedia;
