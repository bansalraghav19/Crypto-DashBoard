export const LazyImport: any = (src: string) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(src), 1000);
  });
};
