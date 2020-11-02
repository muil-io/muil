export const groupBy = (arr, attr) =>
  arr.reduce((r, v, i, a, k = v[attr]) => ((r[k] || (r[k] = [])).push(v), r), {});
