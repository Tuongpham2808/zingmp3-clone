import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import CardReleaseMedia from "../../components/CardReleaseMedia";

const SectionReleaseSlider = ({ homeData = [] }) => {
  const [data, setData] = useState([]);

  let settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    speed: 1000,
    autoplaySpeed: 8000,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: "0px",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(data);
  useEffect(() => {
    let result = homeData?.find(
      (item) => item.sectionId === "hNewrelease"
    )?.items;
    setData(result?.slice(0, 8));
  }, [homeData]);
  return (
    <div>
      <Slider
        {...settings}
        className="relative w-full overflow-hidden cursor-pointer mx-[-14px]"
      >
        {data?.length > 0 &&
          data.map((item) => (
            <CardReleaseMedia
              key={item.encodeId}
              data={item}
            ></CardReleaseMedia>
          ))}
      </Slider>
    </div>
  );
};

export default SectionReleaseSlider;
