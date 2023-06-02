import React from "react";
import { v4 } from "uuid";

const dataPartner = [
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/yg.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/monstercat.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/stone-music.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/taihe.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/FUGA.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/sony.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/universal-1.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/kakao.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/SM-Entertainment.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/hikoon.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/route-note.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/genie.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/beggers.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/believe.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/empire.png",
  },
  {
    url: "https://static-zmp3.zmdcdn.me/skins/zmp3-v6.1/images/partner_logo/orcahrd.png",
  },
];

const SectionPartner = () => {
  return (
    <div className="grid grid-cols-4 md:grid-cols-8 xl:px-10 gap-x-2 gap-y-5 lg:gap-x-[20px] lg:gap-y-[30px]">
      {dataPartner?.length > 0 &&
        dataPartner.map((item) => (
          <div
            key={v4()}
            className="w-full pt-[56.25%] relative rounded lg:rounded-lg overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full flex items-center justify-center bg-white">
              <img
                src={item?.url}
                alt=""
                className="max-w-[90%] max-h-[80%] w-auto"
              />
            </span>
          </div>
        ))}
    </div>
  );
};

export default SectionPartner;
