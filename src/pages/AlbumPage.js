import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as axios from "../apis";
import { toast } from "react-toastify";
import CardMediaRank from "../components/CardMediaRank";
import SectionInfoPlaylist from "./albumPart/SectionInfoPlaylist";
import { formatDuration } from "../utils/fnTime";
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
import CardArtist from "../components/CardArtist";
import SectionInfoPlaylistVertical from "./albumPart/SectionInfoPlaylistVertical";
import SectionSingleSong from "./albumPart/SectionSingleSong";
import HeaderListSong from "./albumPart/HeaderListSong";

const AlbumPage = () => {
  let { pid } = useParams();
  const [dataPlaylist, setDataPlaylist] = useState(null);
  const [listArtists, setListArtists] = useState(null);
  const { isPlaying, curSongId, listPromote, singleSong } = useSelector(
    (state) => state.music
  );
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
  //xử lý khi ấn vào btn phát ngẫu nhiên của album
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
  //kiểm tra và lấy dữ liệu đề xuất khi album chỉ có 1 bài hát
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
            <SectionInfoPlaylistVertical
              dataPlaylist={dataPlaylist}
              onClick={handleRandomSong}
              idRandom={curSongId}
              atAlbum={true}
            >
              {dataPlaylist?.sortDescription && (
                <div className="flex xl:hidden items-center justify-center sm:justify-start gap-x-[5px] mb-[10px] text-sm font-medium textPrimary">
                  <span className="hidden sm:block textSecondary2 whitespace-nowrap">
                    Lời tựa
                  </span>
                  <span className="text1Line2">
                    {dataPlaylist?.sortDescription}
                  </span>
                </div>
              )}
            </SectionInfoPlaylistVertical>
            <div className="w-full">
              <div className="hidden xl:flex items-center gap-x-[5px] mb-[10px] text-sm font-medium textPrimary">
                <span className="textSecondary2 whitespace-nowrap">
                  Lời tựa
                </span>
                <span className="text1Line">
                  {dataPlaylist?.sortDescription}
                </span>
              </div>
              <HeaderListSong></HeaderListSong>
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
                <SectionSingleSong
                  dataPlaylist={dataPlaylist}
                ></SectionSingleSong>
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
        <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-7">
          {listArtists?.length > 0 &&
            listArtists?.map((item) => (
              <CardArtist key={v4()} data={item}></CardArtist>
            ))}
        </div>
      </div>
    </div>
  );
};

export default memo(AlbumPage);
