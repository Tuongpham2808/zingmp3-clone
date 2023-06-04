import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { v4 } from "uuid";

const SectionWeekChart = ({ data = [] }) => {
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(data?.slice(0, 3));
  }, [data]);
  //   console.log(data);
  return (
    <div className="grid grid-rows-3 w-full grid-cols-1 md:grid-rows-1 md:grid-cols-3 h-auto gap-x-3 md:gap-x-4 lg:gap-x-7 gap-y-4">
      {list?.length > 0 &&
        list?.map((item) => (
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
