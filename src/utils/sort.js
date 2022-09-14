const Sort = (data, getLabel, reverse) =>
  data?.sort((a, b) =>
    typeof getLabel === 'function'
      ? reverse
        ? getLabel(a) > getLabel(b)
          ? -1
          : getLabel(b) > getLabel(a)
          ? 1
          : 0
        : getLabel(a) > getLabel(b)
        ? 1
        : getLabel(b) > getLabel(a)
        ? -1
        : 0
      : reverse
      ? a > b
        ? -1
        : b > a
        ? 1
        : 0
      : a > b
      ? 1
      : b > a
      ? -1
      : 0
  );

export default Sort;

export const NumberSort = (data, getValue, reverse) =>
  data?.sort((a, b) =>
    typeof getValue === 'function'
      ? reverse
        ? getValue(b) - getValue(a)
        : getValue(a) - getValue(b)
      : reverse
      ? b - a
      : a - b
  );
