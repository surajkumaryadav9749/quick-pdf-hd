import { useEffect, useRef } from "react";

const useResultFocus = (result) => {
  const resultRef = useRef(null);

  useEffect(() => {
    if (!result || !resultRef.current) return undefined;

    const frame = window.requestAnimationFrame(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      resultRef.current?.querySelector("a[download]")?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [result]);

  return resultRef;
};

export default useResultFocus;
