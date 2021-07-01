import { useEffect, useState } from "react";

export default function useDebounce(value, delay, isValid) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (isValid) {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      return () => {
        clearTimeout(handler);
      };
    }
  }, [value, delay, isValid]);

  return debouncedValue;
}
