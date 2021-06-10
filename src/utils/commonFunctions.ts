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

// pure sorting functions
export const sortedByNumber = (
  initialArray: any,
  fieldName: string,
  increasing: boolean
) => {
  const copyArray: any = [...initialArray];
  copyArray.sort(
    (a: any, b: any) =>
      (Number(a?.[fieldName]) - Number(b?.[fieldName])) * (increasing ? 1 : -1)
  );
  return copyArray;
};

export const sortedLexographically = (
  initialArray: any,
  fieldName: string,
  increasing: boolean
) => {
  const copyArray: any = [...initialArray];
  copyArray.sort((a: any, b: any) =>
    increasing
      ? a[fieldName].localeCompare(b[fieldName])
      : b[fieldName].localeCompare(a[fieldName])
  );
  return copyArray;
};
