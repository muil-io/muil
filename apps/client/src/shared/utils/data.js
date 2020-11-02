export const groupBy = (arr, attr) =>
  // eslint-disable-next-line no-sequences
  arr.reduce((r, v, i, a, k = v[attr]) => ((r[k] || (r[k] = [])).push(v), r), {});
