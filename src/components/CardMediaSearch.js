import React from "react";
import MyTooltip from "./MyTooltip";
import { FiMoreHorizontal } from "react-icons/fi";
import CoverIcon from "./CoverIcon";
import { HiOutlineHeart } from "react-icons/hi";
import ImageMedia from "./ImageMedia";
import { formatLiked } from "../utils/fnNumber";
import { Link } from "react-router-dom";

const CardMediaSearch = ({
  title = "Chàng trai năm đó",
  image = "https://source.unsplash.com/random/?man",
  subTitle = "Sơn Tùng",
  id = "",
  type = 1,
  isAlbum = false,
  size = "large",
  link = "#",
}) => {
  let classglobal = {
    genres: "Bài hát",
    rounded: "rounded",
    btnOther: true,
    sizeImage: size === "large" ? "w-[84px] h-[84px]" : "w-[52px] h-[52px]",
    options: type !== 4 ? "normal" : "searchArtist",
    subTitleOk: subTitle,
  };

  switch (type) {
    case 1:
      classglobal = { ...classglobal };
      break;
    case 3:
      classglobal = {
        ...classglobal,
        genres: isAlbum ? "Album" : "Playlist",
      };
      break;
    case 4:
      classglobal = {
        ...classglobal,
        genres: "Nghệ sĩ",
        rounded: "rounded-full",
        btnOther: false,
        subTitleOk:
          size === "large"
            ? formatLiked(subTitle, "quan tâm")
            : "Nghệ sĩ • " + formatLiked(subTitle, "quan tâm"),
      };
      break;

    default:
      break;
  }

  return (
    <Link
      to={link}
      onClick={link === "# " ? (e) => e.preventDefault() : () => {}}
      className="w-full"
    >
      <div
        className={`group rounded hover:bg-[var(--bg-transparent1)] flex items-center w-full gap-x-[10px] select-none ${
          size === "large"
            ? " bg-[var(--bg-transparent4)] p-[10px]"
            : "px-[10px] py-2"
        }`}
      >
        <div className="flex gap-x-4 w-full items-center overflow-hidden">
          <div className={`overflow-hidden flex-none ${classglobal.rounded}`}>
            <ImageMedia
              image={image}
              classImage={classglobal.sizeImage}
              tyle={classglobal.options}
              id={id}
              link={link}
            ></ImageMedia>
          </div>
          <div className="w-full overflow-hidden">
            {size === "large" && (
              <p className="text-xs font-medium mt-[3px] textSecondary2 mb-[6px]">
                {classglobal.genres}
              </p>
            )}
            <h3
              className={`text-sm font-semibold ${
                size === "large" ? "limit2LineText" : "text1Line"
              }`}
            >
              {title}
            </h3>
            <p className="text-xs font-medium mt-[3px] textSecondary cursor-pointer text1Line">
              {classglobal.subTitleOk}
            </p>
          </div>
        </div>
        {classglobal.btnOther && (
          <div className="flex items-center">
            <div className="w-[46px] h-[46px] hidden items-center justify-center group-hover:flex">
              <CoverIcon>
                <MyTooltip placeholder="Khác" offset={20}>
                  <HiOutlineHeart className="w-5 h-5"></HiOutlineHeart>
                </MyTooltip>
              </CoverIcon>
            </div>
            <div className="w-[46px] h-[46px] hidden items-center justify-center group-hover:flex">
              <CoverIcon>
                <MyTooltip placeholder="Khác" offset={20}>
                  <FiMoreHorizontal className="w-5 h-5"></FiMoreHorizontal>
                </MyTooltip>
              </CoverIcon>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default CardMediaSearch;
