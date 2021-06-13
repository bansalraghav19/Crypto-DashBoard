export const CACHE_TIME = 1000 * 24 * 60 * 60;

export const getLocalStorageValue = (key: string) => {
  const storedValue = localStorage.getItem(key);
  if (
    !storedValue ||
    Number(JSON.parse(storedValue)?.expiryTime) < Number(new Date().getTime())
  ) {
    return {
      isStored: false,
    };
  }
  return {
    isStored: true,
    data: JSON.parse(storedValue).data,
  };
};

export const setLocalStorageValue = (
  key: string,
  data: any,
  withTime?: boolean
) => {
  if (withTime) {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        expiryTime: new Date().getTime() + CACHE_TIME,
      })
    );
  } else {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
      })
    );
  }
};
