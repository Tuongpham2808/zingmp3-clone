import { useEffect, useState } from "react";

const useWindowScroll = (query) => {
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    let elementScroll = document.querySelector(query);
    elementScroll.addEventListener("scroll", updateScroll);
    function updateScroll() {
      let size = elementScroll.scrollTop;
      setScrollTop(size);
    }
    updateScroll();
    return () => elementScroll.removeEventListener("scroll", updateScroll);
  }, [query]);
  return scrollTop;
};

export default useWindowScroll;
