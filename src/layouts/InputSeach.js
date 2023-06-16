import React, { memo, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuTrendingUp } from "react-icons/lu";
import useDeboune from "../hooks/useDeboune";
import * as apis from "../apis";
import { v4 } from "uuid";
import { VscChromeClose } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useNavigate } from "react-router-dom";
import {
  handleFetchSearch,
  setDataSearch,
  setDataSearchSuggest,
} from "../store/searchSlice";
import { editLinkAlbum, johnNameArtist } from "../utils/fnSong";
import CardMediaSearch from "../components/CardMediaSearch";
import CoverItemSearch from "../components/CoverItemSearch";

const InputSeach = () => {
  const { zingchartData } = useSelector((state) => state.search);
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

  let fetchDataSearch = async (keyword) => {
    let res = await apis.apiSearch(keyword);
    if (res?.data?.err === 0) {
      let res2 = await apis.apiSuggestSearch(keyword);
      if (res2?.data?.err === 0) {
        dispatch(
          setDataSearchSuggest(res2?.data?.data?.items?.[1]?.suggestions)
        );
      }
      dispatch(setDataSearch(res?.data?.data));
      navigate({
        pathname: "/tim-kiem/tat-ca",
        search: createSearchParams({
          q: keyword,
        }).toString(),
      });
    }
  };

  //event click to suggest search
  const handleClickSearch = (item) => {
    // console.log(item);
    setValueInput(item);
    fetchDataSearch(item);
  };

  //dispatch data search to redux
  const handleSearch = (e) => {
    if (e.keyCode === 13) {
      fetchDataSearch(debounceValue);
    }
  };

  return (
    <div className="relative max-w-[440px] z-30 flex-1 h-10 rounded-[20px] px-10 SearchContainer bgActive">
      <input
        type="text"
        name="search"
        value={valueInput}
        placeholder="Tìm kiếm bài hát,nghệ sĩ..."
        className="inputSearch w-[75%] sm:w-[82%] h-full bgActive textSBL px-1 text-sm z-10 absolute top-0 left-1/2 -translate-x-1/2"
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
        <ul className="absolute w-full left-0 top-9 flex flex-col items-center z-30 px-[10px] py-[13px] bgFocus textPrimary rounded-b-[20px]">
          <h3 className="text-sm w-full font-bold pb-2 px-[10px]">
            Đề xuất cho bạn
          </h3>
          {valueInput === "" &&
            dataSearchDefaut?.map((item) => (
              <CoverItemSearch
                key={v4()}
                onClick={() => handleClickSearch(item)}
              >
                <LuTrendingUp className="textSecondary2 w-4 h-4"></LuTrendingUp>
                <p className="text-sm textPrimary">{item}</p>
              </CoverItemSearch>
            ))}
          {valueInput === "" && (
            <CoverItemSearch link="/zing-chart">
              <LuTrendingUp className="textSecondary2 w-4 h-4"></LuTrendingUp>
              <p className="text-sm textPrimary2">#zingchart</p>
            </CoverItemSearch>
          )}
          {suggestValue?.[0]?.keywords?.length > 0 &&
            valueInput !== "" &&
            suggestValue?.[0]?.keywords?.map((item) => (
              <CoverItemSearch
                key={v4()}
                onClick={() => handleClickSearch(item?.keyword)}
                className="itemSuggest"
              >
                <IoSearchOutline className="w-4 h-4 textSecondary2"></IoSearchOutline>
                <p className="text-sm textPrimary">{item?.keyword}</p>
              </CoverItemSearch>
            ))}
          {suggestValue?.[0]?.keywords?.length > 0 && valueInput !== "" && (
            <CoverItemSearch
              onClick={() => handleClickSearch(valueInput)}
              className="itemSuggest"
            >
              <IoSearchOutline className="w-4 h-4 textSecondary2"></IoSearchOutline>
              <p className="text-sm textPrimary">
                Tìm kiếm "<span className="font-semibold">{valueInput}</span>"
              </p>
            </CoverItemSearch>
          )}
          <div className="w-full">
            {valueInput !== "" && (
              <div className="w-full">
                <div className="w-full h-[1px] bgTrans1 my-[10px]"></div>
                <h3 className="text-sm w-full font-bold pb-2 px-[10px]">
                  Gợi ý kết quả
                </h3>
              </div>
            )}
            {suggestValue?.[1]?.suggestions.length > 0 &&
              valueInput !== "" &&
              suggestValue?.[1]?.suggestions.map((item) => (
                <CardMediaSearch
                  key={v4()}
                  title={item?.title || item?.name}
                  image={item?.thumb || item?.avatar}
                  type={item?.type}
                  size="small"
                  subTitle={
                    item?.type === 4
                      ? item?.followers
                      : johnNameArtist(item?.artists)
                  }
                  link={editLinkAlbum(
                    item?.link,
                    item?.id,
                    item?.radioPid,
                    item?.type
                  )}
                ></CardMediaSearch>
              ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default memo(InputSeach);
