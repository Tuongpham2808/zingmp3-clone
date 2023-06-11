import { useEffect, useState } from "react";

const useWindowScroll = (query) => {
  const [scrollTop, setScrollTop] = useState(0);
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
  return scrollTop;
};

export default useWindowScroll;
