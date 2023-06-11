import React, { memo, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuTrendingUp } from "react-icons/lu";
import useDeboune from "../hooks/useDeboune";
import * as apis from "../apis";
import { v4 } from "uuid";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { handleFetchSearch, setDataSearch } from "../store/searchSlice";
import CardMedia from "../components/CardMedia";
import { editLinkAlbum, johnNameArtist } from "../utils/fnSong";
import { BsDot } from "react-icons/bs";
import { formatLiked } from "../utils/fnNumber";

const InputSeach = () => {
  const { dataSearch, zingchartData } = useSelector((state) => state.search);
  const [valueInput, setValueInput] = useState("");
  const [suggestValue, setSuggestValue] = useState(null);
  const [dataSearchDefaut, setDataSearchDefault] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let debounceValue = useDeboune(valueInput, 500);
  useEffect(() => {
    dispatch(handleFetchSearch());
  }, [dispatch]);

  const handleOnchangeValue = (e) => {
    setValueInput(e.target.value);
  };
  //get data suggest search whith debound
  useEffect(() => {
    if (debounceValue) {
      const fetchSuggest = async () => {
        let res = await apis.apiSuggestSearch(debounceValue);
        if (res?.data?.err === 0) {
          setSuggestValue(res?.data?.data?.items);
        }
      };
      fetchSuggest();
    }
  }, [debounceValue]);
  //hiển thị mặc định khi ko nhập gì cả
  useEffect(() => {
    if (valueInput === "") {
      setDataSearchDefault(zingchartData?.map((item) => item?.title));
    }
  }, [valueInput, zingchartData]);

  //list suggest search preventDefault
  useEffect(() => {
    let listSuggestElement = document.querySelector(".listSuggestSearch");
    const handleDefault = (e) => {
      e.preventDefault();
    };
    listSuggestElement.addEventListener("mousedown", handleDefault);
    return () => {
      listSuggestElement.removeEventListener("mousedown", handleDefault);
    };
  }, []);

  //event click to suggest search
  let itemSuggestElement = document.querySelectorAll(
    ".listSuggestSearch .itemSuggest p"
  );
  for (let index = 0; index < itemSuggestElement.length; index++) {
    let element = itemSuggestElement[index];
    element.onclick = function (e) {
      console.log(e.target.innerText);
    };
  }
  //dispatch data search to redux
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      const fetchDataSearch = async () => {
        let res = await apis.apiSearch(debounceValue);
        if (res?.data?.err === 0) {
          dispatch(setDataSearch(res?.data?.data));
          navigate("/tim-kiem/tat-ca");
        }
      };
      fetchDataSearch();
    }
  };

  return (
    <div className="relative max-w-[440px] flex-1 h-10 rounded-[20px] px-10 SearchContainer bgActive">
      <input
        type="text"
        name="search"
        value={valueInput}
        placeholder="Tìm kiếm bài hát,nghệ sĩ,lời bài hát..."
        className="inputSearch w-[82%] h-full bgActive textSBL px-1 text-sm z-10 absolute top-0 left-1/2 -translate-x-1/2"
        onChange={handleOnchangeValue}
        onKeyUp={handleSearch}
        autoComplete="off"
      />
      <span className="absolute flex items-center justify-center top-1/2 -translate-y-1/2 left-0 translate-x-1/2 z-10">
        <IoSearchOutline className="w-6 h-6 textSBL"></IoSearchOutline>
      </span>
      {valueInput !== "" && (
        <span
          className="absolute flex items-center justify-center top-1/2 -translate-y-1/2 right-1 -translate-x-1/2 textSBL cursor-pointer z-10"
          onClick={() => setValueInput("")}
        >
          <VscChromeClose></VscChromeClose>
        </span>
      )}
      <span className="absolute inset-0 bgFocus rounded-t-[20px] rounded-b-none bgInputSearch z-[2]"></span>
      <div className="listSuggestSearch">
        <ul className="absolute w-full left-0 top-9 flex flex-col items-center z-50 px-[10px] py-[13px] bgFocus textPrimary rounded-b-[20px]">
          <h3 className="text-sm w-full font-bold pb-2 px-[10px]">
            Đề xuất cho bạn
          </h3>
          {valueInput === "" &&
            dataSearchDefaut?.map((item) => (
              <div
                key={v4()}
                className="w-full itemSuggest py-2 px-[10px] flex items-center gap-x-[10px] hover:bg-[var(--bg-transparent1)] cursor-pointer rounded"
              >
                <LuTrendingUp className="textSecondary2 w-4 h-4"></LuTrendingUp>
                <p className="text-sm textPrimary">{item}</p>
              </div>
            ))}
          {valueInput === "" && (
            <Link
              to="/zing-chart"
              className="w-full py-2 px-[10px] flex items-center gap-x-[10px] hover:bg-[var(--bg-transparent1)] cursor-pointer rounded"
            >
              <LuTrendingUp className="textSecondary2 w-4 h-4"></LuTrendingUp>
              <p className="text-sm textPrimary2">#zingchart</p>
            </Link>
          )}
          {suggestValue?.[0]?.keywords?.length > 0 &&
            valueInput !== "" &&
            suggestValue?.[0]?.keywords?.map((item) => (
              <div
                key={v4()}
                className="w-full itemSuggest py-2 px-[10px] flex items-center gap-x-[10px] hover:bg-[var(--bg-transparent1)] cursor-pointer rounded"
              >
                <IoSearchOutline className="w-4 h-4 textSecondary2"></IoSearchOutline>
                <p className="text-sm textPrimary">{item?.keyword}</p>
              </div>
            ))}
          {suggestValue?.[0]?.keywords?.length > 0 && valueInput !== "" && (
            <div
              key={v4()}
              className="w-full itemSuggest py-2 px-[10px] flex items-center gap-x-[10px] hover:bg-[var(--bg-transparent1)] cursor-pointer rounded"
            >
              <IoSearchOutline className="w-4 h-4 textSecondary2"></IoSearchOutline>
              <p className="text-sm textPrimary">
                Tìm kiếm "<span className="font-semibold">{valueInput}</span>"
              </p>
            </div>
          )}
          <div className="w-full">
            <div className="w-full h-[1px] bgTrans1 my-[10px]"></div>
            <h3 className="text-sm w-full font-bold pb-2 px-[10px]">
              Gợi ý kết quả
            </h3>
            {suggestValue?.[1]?.suggestions.length > 0 &&
              valueInput !== "" &&
              suggestValue?.[1]?.suggestions.map((item) =>
                item?.type !== 4 ? (
                  <CardMedia
                    key={v4()}
                    type="suggestSearch"
                    title={item?.title}
                    artists={johnNameArtist(item?.artists)}
                    image={item?.thumb}
                    link={editLinkAlbum(
                      item?.link,
                      item?.id,
                      item?.radioPid,
                      item?.type
                    )}
                    isPlaylist={item?.type === 3}
                  ></CardMedia>
                ) : (
                  <Link
                    to={editLinkAlbum(
                      item?.link,
                      item?.id,
                      item?.radioPid,
                      item?.type
                    )}
                  >
                    <div className="w-full p-2 flex items-center gap-x-[10px] hover:bg-[var(--bg-transparent3)] rounded">
                      <span className="overflow-hidden">
                        <img
                          src={item?.avatar}
                          alt=""
                          className="w-[52px] h-[52px] object-cover rounded-full"
                        />
                      </span>
                      <div className="flex flex-col items-start">
                        <p className="textPrimary text-sm font-medium text1Line">
                          {item?.name}
                        </p>
                        <div className="text-xs font-medium cursor-pointer text1Line flex items-center">
                          <span className="flex items-center textSecondary">
                            Nghệ sĩ
                            <BsDot className="w-6 h-6 -mx-1 -my-[2px]" />
                          </span>
                          <p className="textSecondary text-xs font-medium text1Line">
                            {formatLiked(item?.followers, "quan tâm")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default memo(InputSeach);
