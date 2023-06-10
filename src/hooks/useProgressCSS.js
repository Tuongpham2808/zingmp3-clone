import { useEffect } from "react";

const useProgressCSS = (progressRef) => {
  useEffect(() => {
    function progressUpdate(event) {
      const tempSliderValue = event.target?.value;
      const progress = (tempSliderValue / progressRef.current.max) * 100;
      progressRef.current.style.background = `linear-gradient(to right, var(--text-primary) ${progress}%, var(--text-secondary) ${progress}%)`;
    }
    progressRef.current?.addEventListener("input", progressUpdate);
    // return function cleanup() {
    //   progressRef.current.removeEventListener("input", progressUpdate);
    // };
  }, [progressRef, progressRef.current?.value]);
  useEffect(() => {
    const tempSliderValue = progressRef.current?.value;
    const progress = (tempSliderValue / progressRef.current.max) * 100;
    progressRef.current.style.background = `linear-gradient(to right, var(--text-primary) ${progress}%, var(--text-secondary) ${progress}%)`;
  }, [progressRef]);
};

export default useProgressCSS;
