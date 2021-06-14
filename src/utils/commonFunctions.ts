const lookup = [
  { value: 1, symbol: "" },
  { value: 1e3, symbol: "k" },
  { value: 1e6, symbol: "M" },
  { value: 1e9, symbol: "G" },
  { value: 1e12, symbol: "T" },
  { value: 1e15, symbol: "P" },
  { value: 1e18, symbol: "E" },
];

export const numberToWords = (number: number | string) => {
  const regex = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const numberValue = Number(number);
  var searchedResult = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return numberValue >= item.value;
    });
  if (searchedResult)
    return (
      (numberValue / searchedResult.value).toFixed(3).replace(regex, "$1") +
      searchedResult.symbol
    );
  return numberValue.toFixed(3);
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
