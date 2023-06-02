import React, { useEffect, useState } from "react";
import ImageMedia from "../../components/ImageMedia";
import Slider from "react-slick";
import { v4 } from "uuid";

const SectionListAlbumsSlider = ({
  homeData = [],
  sectionId = "hEditorTheme",
  styles = "basic",
}) => {
  const [data, setData] = useState([]);

  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 10000,
    slidesToShow: 5,
    slidesToScroll: 5,
    arrows: false,
    centerPadding: "0px",
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  useEffect(() => {
    let result = homeData?.find((item) => item.sectionId === sectionId)?.items;
    setData(result);
  }, [homeData, sectionId]);
  // console.log(data);

  return (
    <div className="md:ml-[-14px] md:mr-[-12px] mx-[-6px]">
      <Slider {...settings} className="relative w-full cursor-pointer">
        {data?.length > 0 &&
          data.map((item) => (
            <div key={v4()} className="md:px-[14px] px-[6px]">
              <div className="flex flex-col gap-y-3">
                <ImageMedia
                  image={item?.thumbnail}
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
