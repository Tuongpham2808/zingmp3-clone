import React from "react";
import Slider from "react-slick";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import * as apis from "../../apis";

let settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  speed: 1000,
  autoplaySpeed: 3000,
  slidesToShow: 3,
  slidesToScroll: 1,
  centerPadding: "0px",
  nextArrow: <NextArrow hover />,
  prevArrow: <PrevArrow hover />,
  responsive: [
    {
      breakpoint: 1280,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const SlickSlider = ({ data }) => {
  const navigate = useNavigate();
  let fetchSongInfo = async (item) => {
    let res = await apis.apiSongInfo(item?.encodeId);
    if (res?.data?.err === 0) {
      // console.log(res?.data?.data);
      navigate(res?.data?.data?.album?.link);
    }
  };

  const handleClickBanner = async (e, item) => {
    if (item?.type === 1) {
      e.preventDefault();
      fetchSongInfo(item);
    }
  };

  return (
    <div className="w-full">
      <div className="pt-8 containerSlider mx-[-15px] overflow-hidden">
        <Slider
          {...settings}
          className="relative w-full overflow-hidden cursor-pointer"
        >
          {data &&
            data.map((item) => (
              <div key={item.encodeId} className="px-[15px]">
                <Link
                  to={item?.link}
                  onClick={(e) => handleClickBanner(e, item)}
                >
                  <img
                    src={item.banner}
                    alt="banner"
                    className="object-cover rounded-[5px]"
                  />
                </Link>
              </div>
            ))}
        </Slider>
      </div>
    </div>
  );
};

export default SlickSlider;
