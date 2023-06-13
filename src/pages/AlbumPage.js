import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as axios from "../apis";
import { toast } from "react-toastify";
import CardMediaRank from "../components/CardMediaRank";
import SectionInfoPlaylist from "./albumPart/SectionInfoPlaylist";
import { formatDate, formatDuration } from "../utils/fnTime";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurSongId,
  setIsPlaying,
  setListPromote,
  setListSongs,
  setPauseAlbum,
  setPlayAlbum,
  setSingleSong,
} from "../store/musicSlice";
import { v4 } from "uuid";
import { setRandom } from "../store/musicSlice";
import { MdLibraryMusic } from "react-icons/md";
import CardArtist from "../components/CardArtist";

const AlbumPage = () => {
  let { pid } = useParams();
  const [dataPlaylist, setDataPlaylist] = useState(null);
  const [listArtists, setListArtists] = useState(null);
  const { isPlaying, atAlbum, curSongId, listPromote, singleSong } =
    useSelector((state) => state.music);
  const dispatch = useDispatch();
  useEffect(() => {
    let playlistId = pid?.replace(".html", "");
    const fetchDetailPlaylist = async () => {
      let res = await axios.apiGetDetaiPlaylist(playlistId);
      if (res.data.err === 0) {
        setDataPlaylist(res?.data?.data);
      } else {
        toast.error("Network Failed!, can't loaded song");
      }
    };
    fetchDetailPlaylist();
  }, [pid]);

  const handleRandomSong = async () => {
    if (isPlaying) {
      dispatch(setPauseAlbum(true));
      dispatch(setIsPlaying(false));
      dispatch(setPlayAlbum(false));
    } else {
      let encodeIdRandom =
        dataPlaylist?.song?.items?.[
          Math.floor(Math.random() * dataPlaylist?.song?.total)
        ]?.encodeId;

      dispatch(setCurSongId(encodeIdRandom));
      dispatch(setIsPlaying(true));
      dispatch(setListSongs(dataPlaylist?.song?.items));
      dispatch(setRandom(true));
      dispatch(setPlayAlbum(true));
    }
  };

  useEffect(() => {
    if (dataPlaylist?.isSingle) {
      dispatch(setSingleSong(true));
      dispatch(setListPromote(dataPlaylist?.sections?.[0]?.items));
    } else {
      dispatch(setSingleSong(false));
      dispatch(setListPromote([]));
    }
  }, [dataPlaylist?.isSingle, dataPlaylist?.sections, dispatch]);

  useEffect(() => {
    if (dataPlaylist?.artists?.length > 0) {
      setListArtists(dataPlaylist?.artists);
    }
  }, [dataPlaylist?.artists]);

  return (
    <div className="pt-[50px] relative">
      <div className="w-full album-page mb-5">
        <div className="w-full flex items-start gap-x-[30px]">
          <SectionInfoPlaylist
            dataPlaylist={dataPlaylist}
            onClick={handleRandomSong}
            idRandom={curSongId}
            atAlbum={true}
          ></SectionInfoPlaylist>
          <div className="flex-1 overflow-x-hidden overflow-y-scroll hiddenScroll">
            <div className="w-full">
              <div className="flex items-center gap-x-[5px] mb-[10px] text-sm font-medium textPrimary">
                <span className="textSecondary2 whitespace-nowrap">
                  Lời tựa
                </span>
                <span className="text1Line">
                  {dataPlaylist?.sortDescription}
                </span>
              </div>
              <div className="p-[10px] flex items-center textSecondary2">
                <div className="flex items-center gap-x-[10px] flex-1">
                  <span className="h-5">
                    <MdLibraryMusic className="w-4 h-4"></MdLibraryMusic>
                  </span>
                  <span className="uppercase text-sm font-medium">Bài hát</span>
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <span className="uppercase text-sm font-medium">Album</span>
                  <span className="uppercase text-sm font-medium">
                    Thời gian
                  </span>
                </div>
              </div>
              <div className="pb-5">
                {dataPlaylist?.song?.total > 0 &&
                  dataPlaylist?.song?.items?.map((item) => (
                    <CardMediaRank
                      key={v4()}
                      isPlaylist={true}
                      title={item?.title}
                      artists={item?.artistsNames}
                      durations={formatDuration(item?.duration)}
                      id={item?.encodeId}
                      image={item?.thumbnail}
                      streamingStatus={item?.streamingStatus}
                      titleAlbum={item?.album?.title}
                      linkAlbum={item?.album?.link}
                      listSongsRight={dataPlaylist?.song?.items}
                    ></CardMediaRank>
                  ))}
              </div>
              {singleSong && (
                <div className="w-full textPrimary">
                  <h3 className="mb-2 text-base leading-5 font-bold capitalize">
                    Thông tin
                  </h3>
                  <div className="w-full flex items-center gap-x-4">
                    <div className="textSecondary2 text-[13px] font-medium flex flex-col gap-2 items-start">
                      <p className="leading-[18px]">Số bài hát</p>
                      <p className="leading-[18px]">Ngày phát hành</p>
                      <p className="leading-[18px]">Cung cấp bởi</p>
                    </div>
                    <div className="text-[13px] font-medium flex flex-col gap-2 items-start">
                      <p className="leading-[18px]">1</p>
                      <p className="leading-[18px]">
                        {dataPlaylist?.releaseDate}
                      </p>
                      <p className="leading-[18px]">LOOPS Music</p>
                    </div>
                  </div>
                </div>
              )}
              {listPromote?.length > 0 && (
                <div className="pt-12 w-full textPrimary">
                  <h2 className="capitalize text-xl font-bold mb-5">
                    Có thể bạn quan tâm
                  </h2>
                  <div className="w-full">
                    {listPromote?.length > 0 &&
                      listPromote?.map((item) => (
                        <CardMediaRank
                          key={v4()}
                          isPlaylist={true}
                          title={item?.title}
                          artists={item?.artistsNames}
                          durations={formatDuration(item?.duration)}
                          id={item?.encodeId}
                          image={item?.thumbnail}
                          streamingStatus={item?.streamingStatus}
                          titleAlbum={item?.album?.title}
                          linkAlbum={item?.album?.link}
                          listSongsRight={dataPlaylist?.song?.items}
                        ></CardMediaRank>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full">
        <h2 className="capitalize text-xl font-bold mb-5 textPrimary">
          Nghệ sĩ tham gia
        </h2>
        <div className="w-full grid grid-cols-5 gap-7">
          {listArtists?.length > 0 &&
            listArtists?.map((item) => <CardArtist data={item}></CardArtist>)}
        </div>
      </div>
    </div>
  );
};

export default memo(AlbumPage);
