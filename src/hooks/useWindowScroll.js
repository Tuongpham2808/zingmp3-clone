import { useEffect, useState } from "react";
import useDeboune from "./useDeboune";

const useWindowScroll = (query) => {
  const [scrollTop, setScrollTop] = useState(0);
  let deBounceScroll = useDeboune(scrollTop, 500);
  useEffect(() => {
    let elementScroll = document.querySelector(query);
    function updateScroll() {
      let size = elementScroll?.scrollTop;
      setScrollTop(size);
    }
    elementScroll?.addEventListener("scroll", updateScroll);
    return () => {
      elementScroll?.removeEventListener("scroll", updateScroll);
    };
  }, [query]);
  return deBounceScroll;
};

export default useWindowScroll;
