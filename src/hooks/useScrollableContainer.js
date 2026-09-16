import { useRef } from "react";

const useScrollableContainer = () => {
  const scrollableDivRef = useRef(null);

  const handleScroll = () => {
    const element = scrollableDivRef.current;

    if (!element) return;

    if (element.scrollTop > 1) {
      localStorage.setItem(
        "scroll",
        element.scrollTop
      );
    }
  };

  return {
    scrollableDivRef,
    handleScroll,
  };
};

export default useScrollableContainer;