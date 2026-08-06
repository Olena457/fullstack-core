import { useState, useEffect } from "react";

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F,
) => {
  const result = store(callback) as F;
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsHydrated(true);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return isHydrated ? result : undefined;
};
