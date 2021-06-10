import { useState, useEffect } from "react";

const CACHE_TIME: number = 24 * 60 * 60;

const getStorageValue = (key: string, intialValue: any) => {
  const savedValue: any = localStorage.getItem(key);

  if (savedValue) {
    if (savedValue?.expiryTime && Date.now() <= savedValue?.expiryTime) {
      return JSON.parse(savedValue);
    }
  }

  if (intialValue instanceof Function) return intialValue();

  return intialValue;
};

const useLocalStorage = (key: string, intialValue: any) => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, intialValue);
  });

  useEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify({
        value,
        expiryTime: Date.now() + CACHE_TIME,
      })
    );
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
