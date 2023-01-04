
export const stringify = (object: any) => JSON.stringify(object);

export const equalEachOther = (array: any[]) => {
  const single = array[0];
  return array.every(i => stringify(i) === stringify(single));
};
