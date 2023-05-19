import { useEffect, useState } from "react";

function useReadLocalStorage<T>(key: string): T | null {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      setValue(JSON.parse(storedValue));
    }
  }, [key]);

  return value;
}

export default useReadLocalStorage;