import { useState, useEffect, useRef } from "react";

const useDebounce = (value: string, delay: number) => {
  const [bouncedValue, setBouncedValue] = useState(value);
  const ref = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (ref?.current) {
      clearTimeout(ref?.current);
    }
    ref.current = setTimeout(() => {
      setBouncedValue(value);
    }, delay);
  }, [value, delay]);
  return bouncedValue;
};

export default useDebounce;
