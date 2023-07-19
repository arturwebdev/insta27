export const customNumberToString = (n) => {
  if (n >= 1000) {
    return (n / 1000).toFixed(1) + " K";
  }
  return n;
};
