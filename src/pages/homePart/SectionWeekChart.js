import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const SectionWeekChart = ({ homeData = [] }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    let result = homeData?.find(
      (item) => item.sectionType === "weekChart"
    )?.items;
    setData(result?.slice(0, 3));
  }, [homeData]);
  //   console.log(data);
  return (
    <div className="grid grid-rows-3 w-full grid-cols-1 md:grid-rows-1 md:grid-cols-3 h-auto gap-x-7 gap-y-4">
      {data?.length > 0 &&
        data?.map((item) => (
          <Link key={v4()} to="/zing-chart">
            <img
              src={item?.cover}
              alt=""
              className="rounded w-full object-cover"
            />
          </Link>
        ))}
    </div>
  );
};

export default SectionWeekChart;
