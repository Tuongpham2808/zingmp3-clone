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
  const { listSongs, relatedsongs, curSongId, listSongConcat, randomSong } =
    useSelector((state) => state.music);
  const dispatch = useDispatch();
  // console.log(relatedsongs);

  let played = true;
  useEffect(() => {
    let dataRender = [];

    if (listSongs.length > 0 && relatedsongs.length > 0 && !randomSong) {
      dataRender = dataRender.concat(listSongs, "text", relatedsongs);
    } else {
      dataRender =
        listSongs.length > 0
          ? listSongs
          : relatedsongs.length > 0
          ? relatedsongs
          : [];
    }
    if (dataRender.length > 0) {
      dispatch(
        setListSongConcat(
          dataRender.filter((item) => Number(item.streamingStatus) !== 2)
        )
      );
    }
    if (randomSong) {
      dispatch(
        setListSongConcat(
          randomArray2([].concat(listSongs, relatedsongs)).filter(
            (item) => Number(item.streamingStatus) !== 2
          )
        )
      );
    }
  }, [dispatch, listSongs, randomSong, relatedsongs]);

  return (
    <div className="relative h-full overflow-hidden">
      <SidebarHeader className="sticky top-0 left-0 right-0 z-10"></SidebarHeader>
      <div className="overflow-y-scroll hiddenScroll pb-[var(--height-playControll)] w-full h-full">
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
                    title={item.title}
                    artists={item?.artistsNames || item?.artists_names}
                    id={item?.encodeId || item?.id}
                    type="small"
                    image={item.thumbnail}
                    played={played}
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
