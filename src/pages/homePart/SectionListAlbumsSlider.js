import React, { useEffect, useState } from "react";
import ImageMedia from "../../components/ImageMedia";
import Slider from "react-slick";
import { v4 } from "uuid";
import useWindowSize from "../../hooks/useWindowSize";

const SectionListAlbumsSlider = ({ data = [], styles = "basic" }) => {
  const [numberItem, setNumberItem] = useState(5);
  let size = useWindowSize();
  useEffect(() => {
    if (size === "2xl") {
      setNumberItem(5);
    }
    if (size === "xl") {
      setNumberItem(5);
    }
    if (size === "md") {
      setNumberItem(4);
    }
    if (size === "sm") {
      setNumberItem(2);
    }
  }, [size]);

  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 10000,
    slidesToShow: numberItem,
    slidesToScroll: numberItem,
    arrows: false,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: numberItem,
          slidesToScroll: numberItem,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: numberItem,
          slidesToScroll: numberItem,
        },
      },
    ],
  };

  return (
    <div className="md:ml-[-14px] md:mr-[-12px] mx-[-6px]">
      <Slider {...settings} className="relative w-full cursor-pointer">
        {data?.length > 0 &&
          data.map((item) => (
            <div key={v4()} className="lg:px-[14px] md:px-2 px-[6px]">
              <div className="flex flex-col gap-y-3">
                <ImageMedia
                  image={item?.thumbnailM}
                  title={item?.title}
                ></ImageMedia>
                {styles === "basic" && (
                  <span className="text-sm font-medium limit2LineText textSecondary2 leading-[1.25]">
                    {item?.sortDescription}
                  </span>
                )}
                {styles === "more" && (
                  <div className="w-full flex flex-col gap-y-1">
                    <h3 className="text-sm font-bold textPrimary text1Line">
                      {item?.title}
                    </h3>
                    <span className="text-sm font-medium limit2LineText textSecondary2 leading-[1.25]">
                      {item?.artists?.map((artist) => artist?.name).join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default SectionListAlbumsSlider;
