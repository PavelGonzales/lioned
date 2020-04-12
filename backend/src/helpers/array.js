export const diff = (arr1, arr2) => {
  return [arr1, arr2].reduce((a, b) => a.filter(c => !b.includes(c)));
};