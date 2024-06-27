import { FC, RefObject, useCallback, useEffect, useState } from "react";

import { useElementOnScreen, usePrevious } from "../../hooks";
import { Image } from "../Image";

import { OBSERVER_DEFAULT_INIT_OPTIONS, EMPTY } from "./constants";
import { FetchMoreObserverProps } from "./types";

export const FetchMoreObserver: FC<FetchMoreObserverProps> = ({
  onFetchMore,
  intersectionObserverInit,
}) => {
  const [observerRef, setObserverRef] = useState<RefObject<HTMLElement>>({
    current: null,
  });

  const callbackRef = useCallback(
    (value: HTMLImageElement) => {
      setObserverRef({ current: value });
    },
    [setObserverRef]
  );

  const isVisible = useElementOnScreen(
    observerRef.current,
    intersectionObserverInit ?? OBSERVER_DEFAULT_INIT_OPTIONS
  );
  const prevVisible = usePrevious(isVisible) ?? false;

  useEffect(() => {
    if (!prevVisible && isVisible) {
      onFetchMore();
    }
  }, [isVisible, prevVisible, onFetchMore]);

  return <Image ref={callbackRef} src={EMPTY} loading />;
};
