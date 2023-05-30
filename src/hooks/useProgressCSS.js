import { useEffect } from "react";

const useProgressCSS = (progressRef) => {
  useEffect(() => {
    progressRef.current.addEventListener("input", (event) => {
      const tempSliderValue = event.target?.value;
      const progress = (tempSliderValue / progressRef.current.max) * 100;
      progressRef.current.style.background = `linear-gradient(to right, var(--text-primary) ${progress}%, var(--text-secondary) ${progress}%)`;
    });
  }, [progressRef, progressRef.current?.value]);
  useEffect(() => {
    const tempSliderValue = progressRef.current?.value;
    const progress = (tempSliderValue / progressRef.current.max) * 100;
    progressRef.current.style.background = `linear-gradient(to right, var(--text-primary) ${progress}%, var(--text-secondary) ${progress}%)`;
  }, [progressRef]);
};

export default useProgressCSS;
