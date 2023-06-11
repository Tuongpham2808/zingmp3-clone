import { useEffect, useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState("2xl");
  let handleWindowResize = () => {
    let width = window.innerWidth;
    if (width >= 1536) {
      setSize("2xl");
    }
    if (width >= 1280 && width < 1536) {
      setSize("xl");
    }
    if (width >= 768 && width < 1280) {
      setSize("md");
    }
    if (width >= 300 && width < 768) {
      setSize("sm");
    }
  };
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);
  useLayoutEffect(() => {
    handleWindowResize();
  }, []);

  return size;
};

export default useWindowSize;
