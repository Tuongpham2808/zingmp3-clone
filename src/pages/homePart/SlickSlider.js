import React from "react";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

let settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  centerMode: true,
  speed: 500,
  autoplaySpeed: 2000,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerPadding: "0px",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const SlickSlider = () => {
  const { homeData } = useSelector((state) => state.home);
  return (
    <div className="w-full">
      <div className="pt-8 containerSlider">
        <Slider
          {...settings}
          className="w-full relative mx-[-15px] cursor-pointer overflow-hidden"
        >
          {homeData &&
            homeData
              .find((item) => item.sectionType === "banner")
              ?.items.map((item) => (
                <div key={item.encodeId} className="px-[15px]">
                  <img
                    src={item.banner}
                    alt="banner"
                    className="object-cover rounded-[5px]"
                  />
                </div>
              ))}
        </Slider>
      </div>
    </div>
  );
};

export default SlickSlider;
