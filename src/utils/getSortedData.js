const getSortedData = (data) =>
  data.sort((a, b) => new Date(a.date) - new Date(b.date));

export default getSortedData;