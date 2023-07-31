import { useEffect, useRef } from "react";

export function useDebounce(cb: (...args: any[]) => void, duration = 1000) {
  const timer = useRef<NodeJS.Timeout | null>(null);
  const clearTimer = () => timer.current && clearTimeout(timer.current);
  const setTimer = (cb: () => void) =>
    (timer.current = setTimeout(cb, duration));

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, []);
  return (...args: any[]) => {
    clearTimer();
    setTimer(() => cb(...args));
  };
}
