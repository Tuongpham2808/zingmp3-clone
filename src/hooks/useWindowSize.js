import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    return function cleanup() {
      window.removeEventListener("resize", updateSize);
    };
  }, []);
  useLayoutEffect(() => {
    setSize([window.innerWidth, window.innerHeight]);
  }, []);
  return size;
};

export default useWindowSize;
