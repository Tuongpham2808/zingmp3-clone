import { toast } from "react-toastify";
import * as Icon from "./iconsMenu";
export const menu = [
  {
    title: "Khám Phá",
    url: "/",
    icon: <Icon.Discover />,
  },
  {
    title: "#zingchart",
    url: "/zing-chart",
    icon: <Icon.ZingChart />,
  },
  {
    title: "Radio",
    url: "/radio",
    icon: <Icon.Radio />,
    stream: <Icon.Live />,
    onClick: () => {
      toast.warning("Chức năng này chưa được phát triển");
    },
  },
  {
    title: "Thư viện",
    url: "/mymusic",
    icon: <Icon.Library />,
    onClick: () => {
      toast.warning("Chức năng này chưa được phát triển");
    },
  },
];

export const menuSearch = [
  {
    title: "Tất cả",
    url: "/tim-kiem/tat-ca",
  },
  {
    title: "Bài hát",
    url: "/tim-kiem/bai-hat",
  },
  {
    title: "Playlist/album",
    url: "/tim-kiem/playlist",
  },
  {
    title: "Nghệ sĩ/oa",
    url: "/tim-kiem/artist",
  },
  {
    title: "MV",
    url: "/tim-kiem/video",
  },
];
