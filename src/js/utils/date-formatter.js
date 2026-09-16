export const formatDate = (isoString, locale = 'id-ID') => {
  const date = new Date(isoString);
  if (Number.isNaN(date.getTime())) return '-';
  return new Intl.DateTimeFormat(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).format(date);
};
