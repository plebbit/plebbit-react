const convertArrToObj = (arr, key, reArr) =>
  reArr
    ? Object.values(arr?.reduce((a, v) => ({ ...a, [v[key]]: v }), {}))
    : arr?.reduce((a, v) => ({ ...a, [v[key]]: v }), {});
export default convertArrToObj;
