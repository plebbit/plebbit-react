const numFormatter = (num) => {
  if (Math.abs(num) > 999 && Math.abs(num) < 1000000) {
    return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (Math.abs(num) > 1000000) {
    return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million
  } else if (Math.abs(num) > 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B'; // convert to B for number from > 1 billion
  } else if (Math.abs(num) > 1000000000000) {
    return (num / 1000000000000).toFixed(1) + 'Tr'; // convert to Tr for number from > 1 trillion
  } else if (Math.abs(num) < 900) {
    return num; // if value < 1000, nothing to do
  }
};

export default numFormatter;
