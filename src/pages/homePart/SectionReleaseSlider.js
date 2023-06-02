import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import PrevArrow from "./PrevArrow";
import NextArrow from "./NextArrow";
import CardReleaseMedia from "../../components/CardReleaseMedia";
import { Link } from "react-router-dom";

const SectionReleaseSlider = ({ homeData = [] }) => {
  const [data, setData] = useState([]);

  let settings2 = {
    dots: false,
    infinite: true,
    autoplay: true,
    speed: 400,
    autoplaySpeed: 6000,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerPadding: "0px",
    nextArrow: <NextArrow tyle="medium" hover />,
    prevArrow: <PrevArrow tyle="medium" hover />,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  // console.log(data);
  useEffect(() => {
    let result = homeData?.find(
      (item) => item.sectionId === "hNewrelease"
    )?.items;
    setData(result?.slice(0, 8));
  }, [homeData]);
  return (
    <div className="mx-[-14px] xl:mr-[-12px]">
      <Slider
        {...settings2}
        className="relative w-full cursor-pointer containerSlider"
      >
        {data?.length > 0 &&
          data.map((item, index) => (
            <CardReleaseMedia
              key={item.encodeId}
              data={item}
              ranking={index + 1}
            ></CardReleaseMedia>
          ))}
        <CardReleaseMedia isImage={false}>
          <Link to="/">
            <div className="h-[120px] flex items-center justify-center text-[var(--bg-primary)] text-sm font-bold uppercase">
              Xem tất cả
            </div>
          </Link>
        </CardReleaseMedia>
      </Slider>
    </div>
  );
};

export default SectionReleaseSlider;
