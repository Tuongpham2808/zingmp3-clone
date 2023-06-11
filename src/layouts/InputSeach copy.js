import React, { memo, useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { LuTrendingUp } from "react-icons/lu";
import useDeboune from "../hooks/useDeboune";
import * as apis from "../apis";
import { v4 } from "uuid";
import { VscChromeClose } from "react-icons/vsc";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const InputSeach = () => {
  const { zingchartData } = useSelector((state) => state.home);
  const [valueInput, setValueInput] = useState("");
  const [suggestValue, setSuggestValue] = useState(null);
  const [dataSearchDefaut, setDataSearchDefault] = useState([]);
  let debounceValue = useDeboune(valueInput, 500);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    if (debounceValue) {
      const fetchSuggest = async () => {
        let res = await apis.apiSuggestSearch(debounceValue);
        if (res?.data?.err === 0) {
          setSuggestValue(res?.data?.data);
        }
      };
      fetchSuggest();
    }
  }, [debounceValue]);

  useEffect(() => {
    if (valueInput === "") {
      setDataSearchDefault(zingchartData?.map((item) => item?.title));
    }
  }, [valueInput, zingchartData]);

  return (
    <div
      className={`relative max-w-[440px] flex-1 h-10 rounded-[20px] px-10 ${
        focus ? "bgFocus rounded-b-none" : "bgActive"
      }`}
    >
      <input
        type="text"
        name="search"
        value={valueInput}
        placeholder="Tìm kiếm bài hát,nghệ sĩ,lời bài hát..."
        className="w-full h-full bgActive textSBL text-sm"
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => setValueInput(e.target.value)}
        autoComplete="off"
      />
      <span className="absolute flex items-center justify-center top-1/2 -translate-y-1/2 left-0 translate-x-1/2">
        <IoSearchOutline className="w-6 h-6 textSBL"></IoSearchOutline>
      </span>
      {valueInput !== "" && (
        <span
          className="absolute flex items-center justify-center top-1/2 -translate-y-1/2 right-1 -translate-x-1/2 textSBL cursor-pointer"
          onClick={() => setValueInput("")}
        >
          <VscChromeClose></VscChromeClose>
        </span>
      )}
      <div onMouseDown={() => setFocus(true)}>
        {focus && (
          <ul className="absolute w-full left-0 top-9 flex flex-col items-center px-[10px] py-[13px] bgFocus textPrimary rounded-b-[20px]">
            <h3 className="text-sm w-full font-bold pb-2 px-[10px]">
              Đề xuất cho bạn
            </h3>
            {valueInput === "" &&
              dataSearchDefaut?.map((item) => (
                <div
                  key={v4()}
                  className="w-full py-2 px-[10px] flex items-center gap-x-[10px] hover:bg-[var(--bg-transparent1)] cursor-pointer rounded"
                >
                  <LuTrendingUp className="textSecondary2 w-4 h-4"></LuTrendingUp>
                  <p className="text-sm textPrimary">{item}</p>
                </div>
              ))}
            <Link
              to="/zing-chart"
              className="w-full py-2 px-[10px] flex items-center gap-x-[10px] hover:bg-[var(--bg-transparent1)] cursor-pointer rounded"
            >
              <LuTrendingUp className="textSecondary2 w-4 h-4"></LuTrendingUp>
              <p className="text-sm textPrimary2">#zingchart</p>
            </Link>
          </ul>
        )}
      </div>
    </div>
  );
};

export default memo(InputSeach);
