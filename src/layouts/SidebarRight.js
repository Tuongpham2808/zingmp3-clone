import React, { useEffect } from "react";
import SiderbarNewList from "./sibarRightPart/SidebarNewList";
import EmptyPlayList from "./sibarRightPart/EmptyPlayList";
import SidebarHeader from "./sibarRightPart/SidebarHeader";
import { useDispatch, useSelector } from "react-redux";
import { CardMedia } from "../components";
import { v4 } from "uuid";
import { setListSongConcat } from "../store/musicSlice";
import { randomArray2 } from "../utils/fnNumber";

const SidebarRight = () => {
  const {
    listSongs,
    relatedsongs,
    curSongId,
    listSongConcat,
    randomSong,
    atAlbum,
    singleSong,
    listPromote,
  } = useSelector((state) => state.music);
  const dispatch = useDispatch();

  let played = true;
  useEffect(() => {
    //gộp dữ liệu và loại bỏ bài hát premium
    let dataRender = [];
    if (listSongs?.length > 0 && relatedsongs?.length > 0 && !randomSong) {
      dataRender = dataRender?.concat(listSongs, "text", relatedsongs);
    } else {
      dataRender =
        listSongs.length > 0
          ? listSongs
          : relatedsongs.length > 0
          ? relatedsongs
          : [];
    }
    if (singleSong) {
      dataRender = dataRender?.concat(listPromote);
    }
    if (dataRender?.length > 0) {
      dispatch(
        setListSongConcat(
          dataRender?.filter((item) => Number(item?.streamingStatus) !== 2)
        )
      );
    }
    //thực hiện gộp dữ liệu và random sắp xếp lại ví trí của list nhạc
    if (randomSong) {
      let dataRenderRandom = [];
      if (atAlbum) {
        //trường hợp album có 1 bài hát thì sử dụng đề xuất
        if (singleSong) {
          dataRenderRandom = dataRenderRandom.concat(listSongs, listPromote);
        } else {
          dataRenderRandom = dataRenderRandom.concat(listSongs);
        }
      } else {
        dataRenderRandom = dataRenderRandom.concat(listSongs, relatedsongs);
      }
      if (dataRenderRandom.length > 0) {
        dispatch(
          setListSongConcat(
            randomArray2(dataRenderRandom)?.filter(
              (item) => Number(item?.streamingStatus) !== 2
            )
          )
        );
      }
    }
  }, [
    atAlbum,
    dispatch,
    listPromote,
    listSongs,
    randomSong,
    relatedsongs,
    singleSong,
  ]);

  return (
    <div className="relative h-full overflow-hidden sidebarRightPlaying">
      <SidebarHeader></SidebarHeader>
      <div className="overflow-y-scroll hiddenScroll pb-5 w-full h-full pt-[70px]">
        {listSongs?.length <= 0 && relatedsongs?.length <= 0 ? (
          <div>
            <div>
              <EmptyPlayList></EmptyPlayList>
            </div>
            <div className="absolute -translate-y-1/2 top-1/2">
              <SiderbarNewList></SiderbarNewList>
            </div>
          </div>
        ) : (
          <></>
        )}
        {listSongConcat?.length > 0
          ? listSongConcat?.map((item) => {
              if (curSongId === (item?.encodeId || item?.id)) {
                played = false;
              }
              return item === "text" ? (
                <div
                  key={v4()}
                  className="text-sm font-semibold textSecondary w-full py-1 px-2"
                >
                  Đề xuất cho bạn
                </div>
              ) : (
                <div key={v4()} className="flex flex-col textPrimary">
                  <CardMedia
                    title={item?.title}
                    artists={item?.artistsNames || item?.artists_names}
                    id={item?.encodeId || item?.id}
                    type="small"
                    image={item?.thumbnail}
                    played={played}
                    isSBR={true}
                  ></CardMedia>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default SidebarRight;
