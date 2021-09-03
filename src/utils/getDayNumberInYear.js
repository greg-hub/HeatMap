const getDayNumberInYear = (isoDate) => {
  const now = new Date(isoDate);
  const start = new Date(now.getFullYear(), 0, 0);
  const diff =
    now -
    start +
    (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
  const oneDay = 1000 * 60 * 60 * 24;

  return Math.floor(diff / oneDay);
};

export default getDayNumberInYear;
