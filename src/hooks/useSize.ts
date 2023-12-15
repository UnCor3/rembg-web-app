import { useEffect, useState } from "react";
import { debounce } from "../utils/debounce";

const useResize = () => {
  const [listenToResize, _setState] = useState({});

  const setState = () => _setState((prev) => ({ ...prev }));

  useEffect(() => {
    const debouncedFn = debounce(setState, 500);
    window.addEventListener("resize", debouncedFn);
    return () => window.removeEventListener("resize", debouncedFn);
  }, []);
  return {
    listenToResize,
  };
};

export default useResize;
