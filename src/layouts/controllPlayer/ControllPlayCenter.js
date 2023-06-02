import React, { useEffect, useRef, useState } from "react";
import {
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoRepeatOutline,
  IoShuffleOutline,
} from "react-icons/io5";
import useProgressCSS from "../../hooks/useProgressCSS";
import { MyTooltip } from "../../components";
import GroupBtn from "../../components/GroupBtn";
import { useSelector } from "react-redux";
import * as apis from "../../apis";

const ControllPlayCenter = () => {
  // 2 dòng này xử lý code ui cho btn
  const progressRef = useRef(null);
  useProgressCSS(progressRef);
  //lấy data audio ra
  const { isPlaying, curSongId, atAlbum, listSongs } = useSelector(
    (state) => state.music
  );
  const [audio, setAudio] = useState(new Audio());
  const [loading, setLoading] = useState(true);
  const [songInfo, setSongInfo] = useState(true);
  useEffect(() => {
    const fetchDetailSong = async () => {
      setLoading(false);
      const res1 = await apis.apiGetSongDetail(curSongId);
      const res2 = await apis.apiGetSong(curSongId);
      setLoading(true);
      if (res1.data.err === 0) {
        setSongInfo(res1.data.data);
      }
      if (res2.data.err === 0) {
        audio.pause();
        setAudio(res2?.data?.data["128"]);
      }
    };
    fetchDetailSong();
  }, [curSongId]);

  return (
    <div className="flex-1 flex flex-col justify-center items-center max-w-[40%] h-full">
      <div className="flex items-center mb-[3px]">
        <GroupBtn>
          <MyTooltip placeholder="Bật phát ngẫu nhiên" offset={20}>
            <IoShuffleOutline className="w-6 h-6"></IoShuffleOutline>
          </MyTooltip>
        </GroupBtn>
        <GroupBtn>
          <MyTooltip placeholder="Phát trước đó" offset={20}>
            <IoPlaySkipBack className="w-5 h-5"></IoPlaySkipBack>
          </MyTooltip>
        </GroupBtn>
        <div className="w-[50px] h-[50px] p-[5px] flex items-center justify-center">
          <span className="w-10 h-10 mx-[7px] flex-none flex items-center justify-center textPrimary2 border-[1px] hover:border-[var(--bg-primary)] rounded-full">
            <IoPlay className="w-5 h-5 translate-x-[1px]"></IoPlay>
          </span>
        </div>
        <GroupBtn>
          <MyTooltip placeholder="Phát tiếp theo" offset={20}>
            <IoPlaySkipForward className="w-5 h-5"></IoPlaySkipForward>
          </MyTooltip>
        </GroupBtn>
        <GroupBtn>
          <MyTooltip placeholder="Bật phát lặp lại" offset={20}>
            <IoRepeatOutline className="w-6 h-6"></IoRepeatOutline>
          </MyTooltip>
        </GroupBtn>
      </div>
      <div className="flex items-center w-full gap-[10px] mb-[5px]">
        <span className="w-12 text-xs font-medium text-right textPrimary">
          00:03
        </span>
        <div className="h-[15px] w-full flex-1 flex items-center">
          <input
            type="range"
            name="volume"
            min="0"
            max="100"
            className="customProgressBar"
            ref={progressRef}
          />
        </div>
        <span className="w-12 text-xs font-medium text-left textPrimary">
          04:43
        </span>
      </div>
    </div>
  );
};

export default ControllPlayCenter;
