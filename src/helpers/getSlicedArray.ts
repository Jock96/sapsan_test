export const getSlicedArray = <T>(array: T[], size: number) => {
  const slicedArray = [];

  for (let i = 0; i < array.length; i += size) {
    slicedArray.push(array.slice(i, i + size));
  }

  return slicedArray;
};
