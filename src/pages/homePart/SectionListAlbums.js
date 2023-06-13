import React, { useEffect, useState } from "react";
import useWindowSize from "../../hooks/useWindowSize";
import ItemAlbum from "../../components/ItemAlbum";

const SectionListAlbums = ({ data = [], styles = "basic" }) => {
  const [List, setList] = useState([]);
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

  useEffect(() => {
    setList(data?.slice(0, numberItem));
  }, [data, numberItem]);

  return (
    <div className="grid gap-x-3 md:gap-x-4 xl:grid-cols-5 md:grid-cols-4 lg:gap-x-7 grid-cols-2">
      {List?.length > 0 &&
        List.map((item) => <ItemAlbum data={item} styles={styles}></ItemAlbum>)}
    </div>
  );
};

export default SectionListAlbums;
