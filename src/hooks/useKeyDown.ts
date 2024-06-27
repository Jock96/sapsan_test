import { useEffect } from "react";

export const useKeyDown = (callback: () => void, keys: string[]) => {
  useEffect(() => {
    function onKeyup(event: KeyboardEvent) {
      const fit = keys.some((key) => event.key === key);
      if (fit) callback();
    }
    window.addEventListener("keyup", onKeyup);
    return () => window.removeEventListener("keyup", onKeyup);
  }, [callback, keys]);
};
