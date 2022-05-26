export default function truncateString(str, num, end) {
  if (str.length > num) {
    return `${str.slice(0, num)} ${end}`;
  } else {
    return str;
  }
}
