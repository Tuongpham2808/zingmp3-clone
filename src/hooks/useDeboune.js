import { useEffect, useState } from "react";

export default function useDeboune(initialValue, delay = 1000) {
  const [debounceValue, setDebounceValue] = useState(initialValue);
  useEffect(() => {
    let timer = setTimeout(() => {
      setDebounceValue(initialValue);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initialValue]);
  return debounceValue;
}
