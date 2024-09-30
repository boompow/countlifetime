import { useEffect, useRef } from "react";

export const useClickOutside = (handler) => {
  let ref = useRef();

  useEffect(() => {
    const internalHandler = (e) => {
      if (!ref.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("mousedown", internalHandler);

    return () => {
      document.removeEventListener("mousedown", internalHandler);
    };
  });

  return ref;
};

export default useClickOutside;
