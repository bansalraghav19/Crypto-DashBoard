export const numberToWords = (number: number | string) => {
  const numberType = Number(number);
  if (Math.floor(numberType) === numberType) {
    return numberType.toLocaleString();
  } else {
    return Number(numberType.toFixed(3)).toLocaleString();
  }
};

export const scrollToTop = () => {
  window?.scrollTo({ top: 0, behavior: "smooth" });
};
