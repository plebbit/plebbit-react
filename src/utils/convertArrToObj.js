const convertArrToObj = (arr, key, reArr) => {
  return reArr
    ? Object.values(arr.reduce((obj, item) => ({ ...obj, [item[key]]: item }), {}))
    : arr.reduce((obj, item) => ({ ...obj, [item[key]]: item }), {});
};

export default convertArrToObj;
