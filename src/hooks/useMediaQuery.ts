import { useCallback, useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const getMatches = (query: string): boolean =>
    window.matchMedia(query).matches;

  const [matches, setMatches] = useState<boolean>(getMatches(query));

  const handleChange = useCallback(() => {
    setMatches(getMatches(query));
  }, [query]);

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    handleChange();

    if (matchMedia?.addEventListener) {
      matchMedia.addEventListener("change", handleChange);

      return () => {
        matchMedia.removeEventListener("change", handleChange);
      };
    }

    matchMedia.addListener(handleChange);

    return () => {
      matchMedia.removeListener(handleChange);
    };
  }, [query, handleChange]);

  return matches;
};
