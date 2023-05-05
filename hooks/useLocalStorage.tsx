import { useState, useEffect } from "react";

type SetValue<T> = (value: T | ((val: T) => T)) => void;

function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, SetValue<T>] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
