import { useState, useCallback, useEffect } from "react";

export function useElementOnScreen(
  observerElement: HTMLElement | null,
  options?: IntersectionObserverInit
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  const handleObserverAction: IntersectionObserverCallback = useCallback(
    (entries) => {
      const [entry] = entries;
      setIsVisible(entry.isIntersecting);
    },
    []
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserverAction, options);

    if (!observerElement) return;

    observer.observe(observerElement);

    return () => {
      observer.unobserve(observerElement);
    };
  }, [observerElement, options, handleObserverAction]);

  return isVisible;
}
