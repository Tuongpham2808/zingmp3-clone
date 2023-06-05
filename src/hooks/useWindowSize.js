import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    let inSettimeout;
    inSettimeout && clearTimeout(inSettimeout);
    function updateSize() {
      inSettimeout = setTimeout(() => {
        setSize([window.innerWidth, window.innerHeight]);
      }, 400);
    }
    window.addEventListener("resize", updateSize);
    // return function cleanup() {
    //   window.removeEventListener("resize", updateSize);
    // };
  }, []);
  useLayoutEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
  }, []);
  return size;
};

export default useWindowSize;
