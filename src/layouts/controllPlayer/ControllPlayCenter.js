import React, { useEffect, useRef, useState } from "react";
import useProgressCSS from "../../hooks/useProgressCSS";
import { MyTooltip } from "../../components";
import GroupBtn from "../../components/GroupBtn";
import { useDispatch, useSelector } from "react-redux";
import * as apis from "../../apis";
import {
  setCurSongId,
  setIsPlaying,
  setRandom,
  setRepeat,
} from "../../store/musicSlice";
import LoadingIcon from "../../utils/iconsOther/LoadingIcon";
import {
  IoPause,
  IoPlay,
  IoPlaySkipBack,
  IoPlaySkipForward,
  IoRepeatOutline,
  IoShuffleOutline,
} from "react-icons/io5";
import { formatTimeProgress } from "../../utils/fnTime";
import { LuRepeat1 } from "react-icons/lu";
const ControllPlayCenter = () => {
  // 2 dòng này xử lý code ui cho btn
  const progressRef = useRef(null);
  let currentAudio = useRef();
  useProgressCSS(progressRef);
  //lấy data audio ra
  const {
    isPlaying,
    curSongId,
    volumeAudio,
    listSongConcat,
    randomSong,
    repeatSong,
  } = useSelector((state) => state.music);
  const [loading, setLoading] = useState(true);
  const [urlAudio, setUrlAudio] = useState("");
  const [audioProgress, setAudioProgress] = useState(0);
  const musicTotalLengthRef = useRef(null);
  const musicCurrentTimeRef = useRef(null);
  const dispatch = useDispatch();

  //load data audio
  useEffect(() => {
    const fetchSongAudio = async () => {
      setLoading(true);
      const res2 = await apis.apiGetSong(curSongId);
      setLoading(false);
      if (res2.data.err === 0) {
        currentAudio.current.pause();
        setUrlAudio(res2?.data?.data[128]);

        // setAudio(new Audio(res2?.data?.data[128]));
      } else {
        currentAudio.current.pause();
        dispatch(setIsPlaying(false));
      }
    };
    fetchSongAudio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curSongId]);
  // next song
  function handleNextSong() {
    if (listSongConcat) {
      let currentSongIndex;
      listSongConcat.forEach((item, index) => {
        if ((item?.encodeId || item?.id) === curSongId)
          currentSongIndex = index;
      });
      let idNext;
      if (listSongConcat[currentSongIndex + 1] === "text") {
        idNext =
          listSongConcat[currentSongIndex + 2]?.encodeId ||
          listSongConcat[currentSongIndex + 2]?.id;
      } else {
        idNext =
          listSongConcat[currentSongIndex + 1]?.encodeId ||
          listSongConcat[currentSongIndex + 1]?.id;
      }
      if (
        repeatSong === 1 &&
        currentSongIndex + 1 > listSongConcat.length - 1
      ) {
        idNext = listSongConcat[0]?.encodeId || listSongConcat[0]?.id;
      }
      if (repeatSong === 2) {
        idNext = curSongId;
      }
      dispatch(setCurSongId(idNext));
      dispatch(setIsPlaying(true));
      if (repeatSong === 2) {
        currentAudio.current.play();
      }
    }
  }
  //prev song
  function handlePrevSong() {
    if (listSongConcat) {
      let currentSongIndex;
      listSongConcat.forEach((item, index) => {
        if ((item?.encodeId || item?.id) === curSongId)
          currentSongIndex = index;
      });
      let idPrev;
      if (listSongConcat[currentSongIndex - 1] === "text") {
        idPrev =
          listSongConcat[currentSongIndex - 2]?.encodeId ||
          listSongConcat[currentSongIndex - 2]?.id;
      } else {
        idPrev =
          listSongConcat[currentSongIndex - 1]?.encodeId ||
          listSongConcat[currentSongIndex - 1]?.id;
      }
      dispatch(setCurSongId(idPrev));
      dispatch(setIsPlaying(true));
    }
  }
  //ontimeUpdate progress song change
  function handleAudioUpdate(e) {
    //Input current time of the audio
    let minutes = Math.floor(currentAudio.current.currentTime / 60);
    let seconds = Math.floor(currentAudio.current.currentTime % 60);
    let audioCurrentTime = formatTimeProgress(minutes, seconds);
    if (musicCurrentTimeRef.current) {
      musicCurrentTimeRef.current.innerText = audioCurrentTime;
    }
    if (currentAudio.current.duration) {
      const progressPercent = Math.floor(
        (currentAudio.current.currentTime / currentAudio.current.duration) * 100
      );
      progressRef.current.value = progressPercent;
      progressRef.current.style.background = `linear-gradient(to right, var(--text-primary) ${progressPercent}%, var(--text-secondary) ${progressPercent}%)`;
      //Input total length of the audio
      let minutes = Math.floor(currentAudio.current.duration / 60);
      let seconds = Math.floor(currentAudio.current.duration % 60);
      let audioTotalTime = formatTimeProgress(minutes, seconds);
      if (musicTotalLengthRef.current) {
        musicTotalLengthRef.current.innerText = audioTotalTime;
      }
    }
  }

  //click play & pause audio
  const handlePlay = () => {
    if (isPlaying) {
      currentAudio.current.pause();
      dispatch(setIsPlaying(false));
    } else {
      if (!loading) {
        currentAudio.current.pause();
        currentAudio.current.play();
        dispatch(setIsPlaying(true));
      }
    }
  };
  //auto play song when currentId change
  useEffect(() => {
    let inTimeout;
    inTimeout && clearTimeout(inTimeout);
    function autoPlay() {
      if (!loading && isPlaying) {
        const autoPlayAudio = () => {
          currentAudio.current.pause();
          inTimeout = setTimeout(() => {
            currentAudio.current.play();
          }, 160);
        };
        autoPlayAudio();
      }
    }
    autoPlay();
  }, [currentAudio, isPlaying, loading]);

  //handle click progress bar
  const handleMusicProgressBar = (e) => {
    setAudioProgress(e.target.value);
    currentAudio.current.currentTime =
      (e.target.value * currentAudio.current.duration) / 100;
  };
  //load volume change
  useEffect(() => {
    currentAudio.current.volume = volumeAudio / 100;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAudio.current, volumeAudio]);

  function handleRepeat() {
    let number = repeatSong + 1;
    if (number > 2) {
      number = 0;
    }
    dispatch(setRepeat(number));
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center max-w-[40%] h-full">
      <audio
        src={urlAudio}
        ref={currentAudio}
        onEnded={handleNextSong}
        onTimeUpdate={handleAudioUpdate}
      ></audio>
      <div className="flex items-center mb-[3px]">
        <GroupBtn>
          <MyTooltip placeholder="Bật phát ngẫu nhiên" offset={20}>
            <IoShuffleOutline
              className={`w-6 h-6 cursor-pointer select-none ${
                randomSong ? "text-[var(--bg-primary)]" : ""
              }`}
              onClick={() => dispatch(setRandom(!randomSong))}
            ></IoShuffleOutline>
          </MyTooltip>
        </GroupBtn>
        <GroupBtn>
          <MyTooltip placeholder="Phát trước đó" offset={20}>
            <IoPlaySkipBack
              className="w-5 h-5 cursor-pointer"
              onClick={handlePrevSong}
            ></IoPlaySkipBack>
          </MyTooltip>
        </GroupBtn>
        <div className="w-[50px] h-[50px] p-[5px] flex items-center justify-center">
          <span
            className="w-10 h-10 mx-[7px] flex-none flex items-center justify-center cursor-pointer select-none textPrimary2 border-[1px] hover:border-[var(--bg-primary)] rounded-full"
            onClick={handlePlay}
          >
            {loading ? (
              <LoadingIcon />
            ) : isPlaying ? (
              <IoPause className="w-5 h-5" />
            ) : (
              <IoPlay className="w-5 h-5 translate-x-[1px]" />
            )}
          </span>
        </div>
        <GroupBtn>
          <MyTooltip placeholder="Phát tiếp theo" offset={20}>
            <IoPlaySkipForward
              className="w-5 h-5 cursor-pointer select-none"
              onClick={handleNextSong}
            ></IoPlaySkipForward>
          </MyTooltip>
        </GroupBtn>
        <GroupBtn>
          <MyTooltip
            placeholder={
              repeatSong === 0
                ? "Bật phát lại tất cả"
                : repeatSong === 1
                ? "Bật phát lặp lại 1 bài"
                : "Tắt phát lại"
            }
            offset={20}
          >
            <div onClick={handleRepeat}>
              {repeatSong === 2 ? (
                <LuRepeat1 className="w-5 h-5 cursor-pointer select-none text-[var(--bg-primary)]" />
              ) : (
                <IoRepeatOutline
                  className={`w-6 h-6 cursor-pointer select-none ${
                    repeatSong ? "text-[var(--bg-primary)]" : ""
                  }`}
                />
              )}
            </div>
          </MyTooltip>
        </GroupBtn>
      </div>
      <div className="flex items-center w-full gap-[10px] mb-[5px]">
        <span
          className="w-12 text-xs font-medium text-right textPrimary"
          ref={musicCurrentTimeRef}
        >
          00 : 00
        </span>
        <div className="h-[15px] w-full flex-1 flex items-center">
          <input
            type="range"
            name="volume"
            step="1"
            min="0"
            max="100"
            value={audioProgress}
            className="customProgressBar"
            ref={progressRef}
            onChange={handleMusicProgressBar}
          />
        </div>
        <span
          className="w-12 text-xs font-medium text-left textPrimary"
          ref={musicTotalLengthRef}
        >
          04 : 38
        </span>
      </div>
    </div>
  );
};

export default ControllPlayCenter;
