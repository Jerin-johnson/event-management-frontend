import { useEffect, useRef } from "react";

export default function useIntersectionObserver({ onIntersect, enabled }) {
  const observer = useRef();

  const lastElementRef = (node) => {
    if (!enabled) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        onIntersect?.();
      }
    });

    if (node) observer.current.observe(node);
  };

  useEffect(() => {
    return () => observer.current?.disconnect();
  }, []);

  return lastElementRef;
}
