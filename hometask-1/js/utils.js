export const parseDates = (content) => {
  const pattern = /\b(0?[1-9]|[12][0-9]|3[01])\/(0?[1-9]|1[0-2])\/\d{4}\b/g; // dd/mm/yyyy
  const result = content.match(pattern);
  if (result === null) return [];
  return result.map((rawDate) => {
    const [day, month, year] = rawDate.split('/').map(Number);
    return new Date(year, month - 1, day);
  });
};
